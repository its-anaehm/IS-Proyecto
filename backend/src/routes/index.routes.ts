import { Router } from "express";
import AccountRoutes from './account.routes';

const router = Router()

router.use('/account', AccountRoutes);

export default router;