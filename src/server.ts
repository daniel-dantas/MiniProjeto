import DotEnv from 'dotenv';
import App from './app';

DotEnv.config();

new App({ PORT: process.env.PORT as string });