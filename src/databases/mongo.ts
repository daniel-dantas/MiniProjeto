import Mongoose from 'mongoose';
import DotEnv from 'dotenv';

DotEnv.config();

const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE
} = process.env as any;

class Mongo {
    public static async connect(){
        await Mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
    }
}

export default Mongo;