import { DataTypes, Model } from 'sequelize';
import PG from '../databases/postgres';

interface ProductType {
    description: string,
    price: number,
}

const Product = PG.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
})

export default Product;
export {
    ProductType
}