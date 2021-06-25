import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const routes = Router()

routes.post('/register', UserController.registerUser)

export default routes;