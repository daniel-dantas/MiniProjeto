import { create } from 'domain';
import { createClient } from 'redis';
import DotEnv from 'dotenv';

DotEnv.config();

const {
    REDIS_HOST,
    REDIS_PORT,
} = process.env as any;

const client = createClient({
    host: REDIS_HOST,
    port: REDIS_PORT as number,
});

client.on('connect', (err) => {
    console.log(err);
});

export default client;