import { Router } from "express";
import AccountRoutes from './user.routes';
import ProductRoutes from './product.routes';
import HomeRoutes from './home.routes';
import FilterRoutes from './filter.routes';
import CategoryRoutes from './category.routes'; 

const router = Router()

router.use('/users', AccountRoutes);
router.use('/products', ProductRoutes);
router.use('/home', HomeRoutes);
router.use('/filters', FilterRoutes);
router.use('/category', CategoryRoutes);

export default router;