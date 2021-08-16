import { Router } from "express";
import AccountRoutes from './user.routes';
import ProductRoutes from './product.routes';
import HomeRoutes from './home.routes';
import FilterRoutes from './filter.routes';
import CategoryRoutes from './category.routes'; 
import CommentRoutes from './coments.routes';
import DepartmentRoutes from './department.routes';
import QualificationRoutes from './qualification.routes';

const router = Router()

router.use('/users', AccountRoutes);
router.use('/products', ProductRoutes);
router.use('/home', HomeRoutes);
router.use('/filters', FilterRoutes);
router.use('/departments', DepartmentRoutes);
router.use('/category', CategoryRoutes);
router.use('/comments', CommentRoutes);
router.use("/qualification", QualificationRoutes);

export default router;