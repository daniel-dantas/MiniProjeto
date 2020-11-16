import { Schema, model, Types, Document } from 'mongoose';

interface IPurchase extends Document {
    userEmail: string,
    totalPaid: number,
    products?: {
        _id: string,
        description: string,
        price: number,
        qntd: number
    }[]
}

const PurchaseScheema = new Schema({
    userEmail: {
        type: String,
        required: true,
    },
    totalPaid: {
        type: Number,
        required: true,
    },
    products: {
        type: [{
            description: String,
            price: Number,
            qntd: Number
        }]
    }
});

export default model('Purchase', PurchaseScheema);
export {
    IPurchase
}