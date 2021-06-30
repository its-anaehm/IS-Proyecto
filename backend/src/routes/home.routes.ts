import { Router } from "express";
import { HomeController } from "../controllers/home.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const routes = Router()

//routes.post('/catalogue');
//routes.post('/about');
//routes.post('/contact');
routes.get('/wishlist', verifyToken , HomeController.verifyLogin);

export default routes;