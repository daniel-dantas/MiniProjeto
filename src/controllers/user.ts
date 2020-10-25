import { Request, Response } from 'express';
import UserModel from '../models/user';

export default class UserController {
    public static async create(req: Request, res: Response){
        const body = req.body;

        await UserModel.create({...body}).then(resp => {
            return res.status(200).json({...resp});
        }).catch(err => {
            console.log(err);
            return res.status(400).json({
                valueErr: err
            });
        });
    }
}