import { Router } from "express";
import AccountRoutes from './user.routes';

const router = Router()

router.use('/users', AccountRoutes);

export default router;