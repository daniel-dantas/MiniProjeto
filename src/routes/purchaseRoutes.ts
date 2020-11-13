import { Router } from 'express'
import PurchaseController from '../controllers/purchase';

const routes = Router();

routes.post('/', PurchaseController.create);
routes.get('/', PurchaseController.read);

export default routes;