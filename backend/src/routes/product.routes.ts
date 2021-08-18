import { Router } from "express";
import ProductController from '../controllers/product.controller';
import { verifyToken } from "../middlewares/auth.middleware";

const routes = Router()

/** Obtener la lista de productos */
routes.get('/page=:page', ProductController.getAllProducts)
/** Obtener la lista de productos */
routes.get('/:id', ProductController.getOneProduct)
/** Obtener la lista de productos populares, limite 50 productos */
routes.get('/popular', ProductController.getPopularProducts)
/** Obtiene la información de todos los productos publicados */
routes.post('/productInfo/page=:page', ProductController.productDetail)
/** Obtiene la información de todos los productos de una categoria en especifico */
routes.get('/productCategory/:id', ProductController.productCategory)
/** Registrar un nuevo producto */
routes.post('/', verifyToken, ProductController.addProduct)
/** Eliminar un producto */
routes.put('/:id/:type', verifyToken, ProductController.deleteProduct)

export default routes;