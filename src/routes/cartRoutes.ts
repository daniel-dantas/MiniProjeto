import { Router } from 'express';
import CartController from '../controllers/cart';

const routes = Router();

routes.post('/insert', CartController.insert);
routes.get('/read', CartController.read);
routes.delete('/remove', CartController.remove);

export default routes;
