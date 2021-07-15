import { Router } from "express";
import { HomeController } from "../controllers/home.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const routes = Router()

/** Ruta para la lista de deseos del usuario */
routes.get('/wishlist', verifyToken , HomeController.verifyWishlist);

routes.get('/subscribe', verifyToken, HomeController.getSubscribed);
export default routes;