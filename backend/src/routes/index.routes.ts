import { Router } from "express";
import AccountRoutes from './user.routes';
import ProductRoutes from './product.routes';
import HomeRoutes from './home.routes';

const router = Router()

router.use('/users', AccountRoutes);
router.use('/products', ProductRoutes);
router.use('/home', HomeRoutes);

export default router;