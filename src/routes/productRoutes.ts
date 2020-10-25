import { Router } from 'express';
import ProductController from '../controllers/product';

const routes = Router();

routes.post('/', ProductController.create);
routes.get('/', ProductController.read);

export default routes;
