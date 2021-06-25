import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { Login } from "../controllers/user.controller";


const routes = Router()

routes.post('/register', UserController.registerUser)
routes.post('/login',Login.sucessLogin)

export default routes;