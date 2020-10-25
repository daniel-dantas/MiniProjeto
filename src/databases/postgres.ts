import { Sequelize } from 'sequelize';
import DotEnv from 'dotenv';

DotEnv.config();

const { 
    PG_HOST,
    PG_DBNAME, 
    PG_USERNAME, 
    PG_PASSWORD 
} = process.env as any;

const sequelize = new Sequelize(PG_DBNAME, PG_USERNAME, PG_PASSWORD, {
    host: PG_HOST,
    dialect: 'postgres'
});

sequelize.sync();

export default sequelize;
