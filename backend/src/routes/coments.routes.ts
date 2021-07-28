import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const routes = Router()

/** Obtener los comentarios publicados en los productos */
routes.get('/:id', verifyToken, CommentController.getProductComment);

export default routes;