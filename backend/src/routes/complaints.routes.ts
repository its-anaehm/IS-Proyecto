import { Router } from "express";
import { ComplaintController } from "../controllers/complaints.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import router from "./index.routes";

const routes = Router();

routes.post('/:acusserid/:acussedid/:complainttype', verifyToken, ComplaintController.makeComplaint);
routes.get('/listcomplaint', verifyToken, ComplaintController.listComplaint);
routes.get('/listcomplaintlimit', verifyToken, ComplaintController.listComplaintLimit);
routes.put('/verifyComplaint/:state/:id', verifyToken, ComplaintController.verifyComplaint);

export default routes;