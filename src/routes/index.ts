import { Router } from 'express';

import UserRoutes from './userRoutes';
import ProductRoutes from './productRoutes';
import CartRoutes from './cartRoutes';
import PurchaseRoutes from './purchaseRoutes';

const routes = Router();

routes.use('/user', UserRoutes);
routes.use('/product', ProductRoutes);
routes.use('/cart', CartRoutes);
routes.use('/purchase', PurchaseRoutes);

export default routes;