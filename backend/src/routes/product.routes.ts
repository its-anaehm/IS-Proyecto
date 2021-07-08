import { Router } from "express";
import ProductController from '../controllers/product.controller';
import { verifyToken } from "../middlewares/auth.middleware";

const routes = Router()

/** Registrar un nuevo usuario */
routes.post('/', ProductController.addProduct)

export default routes;