import express, { json } from 'express';
import Cors from 'cors';
import Routes from './routes';
import MongoDB from './databases/mongo';

interface Props {
    PORT: number | string,
}

class App {

    private express: express.Application;

    constructor({ PORT } : Props) {
        this.express = express();
        this.express.use(json());
        this.express.use(Cors());
        this.routes();
        this.listen(PORT);

        MongoDB.connect().then(() => {
            console.log(`Mongo running perfectly`);
        }).catch(err => {
            console.log(`Mongo connection error: ${err}`);
        });
    }

    private routes(){
        this.express.use('/api/v1', Routes);
        this.express.get('/api/v1', (req, res) => {
            return res.status(200).json({
                author: 'Daniel Dantas',
                email: 'daniel.dantas.developer@gmail.com',
            })
        });
    }

    private listen(PORT: number | string) {
        this.express.listen(PORT, () => {
           console.log(`server is open in port ${PORT}`);
        });
    }

}

export default App;
