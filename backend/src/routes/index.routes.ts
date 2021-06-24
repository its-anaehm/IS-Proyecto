import { Router } from "express";
import { UserController } from '../controllers/user.controller';

const router = Router()

router.get('/', UserController.hello);

router.get('/users', UserController.getUsers);

export default router;