import { Router } from "express";
import { HomeController } from "../controllers/home.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const routes = Router()

/** Ruta para la lista de deseos del usuario */
routes.get('/wishlist', verifyToken , HomeController.verifyWishlist);
/** Se suscribe a un producto en especifico */
routes.get('/subscribe/:id', verifyToken, HomeController.getSubscribed);

routes.get('/removeSub/:id', verifyToken, HomeController.removeFromWishlist);

routes.post('/specificWishlist/:id', verifyToken, HomeController.specificWishlist);
export default routes;