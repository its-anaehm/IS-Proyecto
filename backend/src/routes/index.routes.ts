import { Router } from "express";
import AccountRoutes from './user.routes';
import HomeRoutes from './home.routes';

const router = Router()

router.use('/users', AccountRoutes);
router.use('/home', HomeRoutes);

export default router;