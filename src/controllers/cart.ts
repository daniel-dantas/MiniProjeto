import { Request, Response } from 'express';
import ProductModel from '../models/product';
import { ProductType } from '../models/product';
import RedisClient from '../databases/redis';


interface DataCart {
    id: number,
    description: string,
    qntd: number,
    price: number,
}

export default class CartController {
    public static async insert(req: Request, res: Response){
        const body = req.body as {
            productId: number,
            description: string,
            qntd: number,
            price: number
        };
        const header = req.headers;

        const product = await ProductModel.findOne({where: {id: body.productId}});

        if(!product){
            return res.status(400).json({message: 'Product not found'});
        }

        RedisClient.get(header.useremail as string, (err, value) => {

            if(err){
                return res.status(400).json({ message: 'You forgot to pass the useremail parameter in the request header' });
            }

            if( value ){
                const cart = JSON.parse(value) as DataCart[];
                let increment = false;

                cart.map(item => {
                    if(item.id === body.productId){
                        item.qntd += body.qntd;
                        increment = true;
                    }
                });

                if(!increment){
                    cart.push({
                        id: body.productId,
                        description: product?.get().description,
                        qntd: body.qntd,
                        price: body.qntd * product?.get().price
                    });
                }
                
                RedisClient.setex(header.useremail as string, 3600, JSON.stringify(cart));
            } else {
                RedisClient.setex(header.useremail as string, 3600,
                     JSON.stringify([{
                         id: body.productId,
                         description: product?.get().description,
                         qntd: body.qntd,
                         price: body.qntd * product?.get().price
                     }]));
            }
            return res.status(200).json({status: 'Success'});
        });
    }

    public static async read(req: Request, res: Response){

        const header = req.headers;

        RedisClient.get(header.useremail as string, (err, value) => {
            if(err){
                return res.status(400).json({ message: 'You forgot to pass the useremail parameter in the request header' });
            }

            if( value ){
                return res.status(200).json(JSON.parse(value) as DataCart[]);
            } else {
                return res.status(400).json({message: 'No cart found for this user'});
            }
        });
    }

    public static async remove(req: Request, res: Response){
        const body = req.body as { productId: number, qntd?: number };
        const header = req.headers;

        RedisClient.get(header.useremail as string, (err, value) => {

            if(err){
                return res.status(400).json({ message: 'You forgot to pass the useremail parameter in the request header' });
            }

            if( value ){
                const cart = JSON.parse(value) as DataCart[];
                let cartAux = null;
                cart.map((item, index) => {
                    if(item.id === body.productId){
                        if(body.qntd){
                            item.qntd -= body.qntd;
                        }else{
                            cartAux = cart.slice(index+1, cart.length);
                        }
                    }
                });
                RedisClient.setex(header.useremail as string, 3600, JSON.stringify((cartAux) ? cartAux : cart));
            } else {
                return res.status(400).json({message: 'No cart found for this user'});
            }
            return res.status(200).json({status: 'Success'});
        });
    }

}
