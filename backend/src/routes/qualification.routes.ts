import { Router } from 'express';
import QualificationController from '../controllers/qualification.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const routes = Router();

routes.post('/add', verifyToken, QualificationController.addQualification);
routes.get('/:id', verifyToken, QualificationController.getUserQualification);

export default routes;