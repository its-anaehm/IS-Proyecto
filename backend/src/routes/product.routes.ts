import { Router } from "express";
import ProductController from '../controllers/product.controller';
import { verifyToken } from "../middlewares/auth.middleware";

const routes = Router()

/** Obtener la lista de productos */
routes.get('/', ProductController.getAllProducts)
/** Obtener la lista de productos populares, limite 50 productos */
routes.get('/popular', ProductController.getPopularProducts)
/** Obtiene la información de todos los productos publicados */
routes.get('/productInfo', ProductController.productDetail)
/** Obtiene la información de todos los productos de una categoria en especifico */
routes.get('/productCategory', ProductController.productCategory)
/** Registrar un nuevo producto */
routes.post('/', ProductController.addProduct)

export default routes;