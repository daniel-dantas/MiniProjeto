import { Router } from 'express';

import UserRoutes from './userRoutes';
import ProductRoutes from './productRoutes';
import CartRoutes from './cartRoutes';

const routes = Router();

routes.use('/user', UserRoutes);
routes.use('/product', ProductRoutes);
routes.use('/cart', CartRoutes);

export default routes;