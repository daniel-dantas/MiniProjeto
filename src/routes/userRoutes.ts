import { Router } from 'express';
import UserController from '../controllers/user';

const routes = Router();

routes.post('/', UserController.create);

export default routes;