import { Model, DataTypes } from 'sequelize';
import PG from '../databases/postgres';

const User = PG.define('User', {
    name: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
    }
});

export default User;