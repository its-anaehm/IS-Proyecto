import { Router } from "express";
import { CategoryController } from "../controllers/category.controller"; 

const routes = Router()

/** Obtener lista de todas las categorías */
routes.get('/', CategoryController.getCategory);
/** Obtener lista de las categorías más populares */
routes.post('/popular', CategoryController.getPopularCategories);

export default routes;