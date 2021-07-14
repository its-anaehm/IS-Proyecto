import { Router } from "express";
import { CategoryController } from "../controllers/category.controller"; 
import { verifyToken } from "../middlewares/auth.middleware";

const routes = Router()

/** Obtener lista de todas las categorías */
routes.get('/', CategoryController.getCategory);
/** Obtener lista de las categorías más populares */
routes.get('/popular', CategoryController.getPopularCategories);
/** Obtener lista de las categorías suscritas del usuario */
routes.get('/suscribed', verifyToken, CategoryController.getSuscribedCategories);
/** Obtener lista de las categorías suscritas del usuario */
routes.post('/:id/suscribe', verifyToken, CategoryController.suscribeToCategory);

export default routes;