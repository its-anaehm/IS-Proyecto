import { Router } from "express";
import ProductController from '../controllers/product.controller';
import { verifyToken } from "../middlewares/auth.middleware";

const routes = Router()

/** Obtener la lista de productos */
routes.get('/', ProductController.getAllProducts)
/** Obtener la lista de productos populares, limite 50 productos */
routes.get('/popular', ProductController.getPopularProducts)
/** Registrar un nuevo producto */
routes.post('/', ProductController.addProduct)

export default routes;