import { Router } from "express";
import { FilterController } from "../controllers/filter.controller";

const routes = Router()

routes.get('/municipality', FilterController.getMunicipality);
routes.get('/department', FilterController.getDepartment);

export default routes;