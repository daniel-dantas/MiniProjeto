import { Request, Response } from 'express';
import RedisClient from '../databases/redis';
import PurchaseModel, { IPurchase } from '../models/purchase';

interface DataCart {
    id: number,
    description: string,
    qntd: number,
    price: number,
}

class PurchaseController {
    public static async create(req: Request, res: Response){
        const { useremail } = req.headers as { useremail: string };

        RedisClient.get(useremail, (err, value) => {
            if(err){
                return res.status(400).json({ message: 'You forgot to pass the useremail parameter in the request header' });
            }

            if( value ){
                let purchase: IPurchase = { 
                    userEmail: useremail,
                    totalPaid: 0,
                };

                const itensCart = JSON.parse(value) as DataCart[]

                purchase.products = itensCart.map(value => {
                    purchase.totalPaid += value.price;
                    return value;
                });

                PurchaseModel.create(purchase).then(result => {
                    RedisClient.del(useremail);
                    return res.status(200).json(result);
                }).catch(err => {
                    return res.status(500).json({message: 'Close purchase failed'});
                });

                return res.status(200).json(JSON.parse(value) as DataCart[]);
            } else {
                return res.status(400).json({message: 'No cart found for this user'});
            }

        });


    }

    public static async read(req: Request, res: Response){
        const { useremail } = req.headers as { useremail: string };

        let purchases = await PurchaseModel.find({userEmail: useremail});

        return res.status(200).json(purchases);
    }
    
}

export default PurchaseController;