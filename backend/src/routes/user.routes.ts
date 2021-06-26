import { Router } from "express";
import { UserController } from "../controllers/user.controller";


const routes = Router()

routes.post('/register', UserController.registerUser)
routes.post('/login',UserController.sucessLogin)

export default routes;