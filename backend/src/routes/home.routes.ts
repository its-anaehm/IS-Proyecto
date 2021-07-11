import { Router } from "express";
import { HomeController } from "../controllers/home.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const routes = Router()

//routes.post('/about');
//routes.post('/contact');
/** Ruta para la lista de deseos del usuario */
routes.get('/wishlist', verifyToken , HomeController.verifyLogin);

export default routes;