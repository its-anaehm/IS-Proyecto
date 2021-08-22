import { Router } from "express";
import { ComplaintController } from "../controllers/complaints.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import router from "./index.routes";

const routes = Router();

routes.post('/:acusserid/:acussedid/:complainttype', verifyToken, ComplaintController.makeComplaint);
routes.get('/listcomplaint', verifyToken, ComplaintController.listComplaint);
routes.get('/listcomplaintlimit', verifyToken, ComplaintController.listComplaintLimit);
routes.post('/getSpecificComplaint/:id', verifyToken, ComplaintController.getComplaintSpecific);
routes.put('/verifyComplaint/:state/:idcomplaint/:userid', verifyToken, ComplaintController.verifyComplaint);

export default routes;