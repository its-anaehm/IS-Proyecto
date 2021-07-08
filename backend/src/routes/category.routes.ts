import { Router } from "express";
import { CategoryController } from "../controllers/category.controller"; 

const routes = Router()

routes.get('/', CategoryController.getCategory);

export default routes;