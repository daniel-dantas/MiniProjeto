import {Request, Response} from 'express';
import ProductModel from '../models/product';

export default class ProductController {
    public static create(req: Request, res: Response){

        const body = req.body;

        ProductModel.create({...body}).then(product => {
            return res.status(200).json(product);
        }).catch(err => {
            return res.status(400).json({errValue: err});
        });
    }

    public static read(req: Request, res: Response){
        ProductModel.findAll().then(products => {
            return res.status(200).json(products);
        })
    }
    
}
