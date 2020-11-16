import { Router } from 'express'
import PurchaseController from '../controllers/purchase';

const routes = Router();

routes.post('/', PurchaseController.create);
routes.get('/', PurchaseController.read);
routes.get('/search', PurchaseController.search);

export default routes;