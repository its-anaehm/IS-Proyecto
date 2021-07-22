import { Router } from "express";
import DepartmentController from "../controllers/department.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const routes = Router()

/** Obtener lista de los municipios */
routes.get('/', verifyToken, DepartmentController.getDepartmentList);
/** Obtener lista de los departamentos */
routes.get('/:id/municipies', verifyToken, DepartmentController.getDepartmentMunicipies);

export default routes;