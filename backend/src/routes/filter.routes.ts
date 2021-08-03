import { Router } from "express";
import { FilterController } from "../controllers/filter.controller";
import router from "./index.routes";

const routes = Router()

routes.get("/", FilterController.getFilteredProducts)
/** Obtener lista de los municipios */
routes.get('/municipality/id=:id', FilterController.getMunicipality);
/** Obtener lista de los departamentos */
routes.get('/department', FilterController.getDepartment);

export default routes;