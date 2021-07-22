import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";


const routes = Router()

/** Obtener la información de todos los usuarios ordenados en orden alfabético.
 * @param :page Numero de página 
 */
routes.get('/page=:page',verifyToken, UserController.getUsersInfo)
/** Obtener la información de un usuario */
routes.get('/:id',verifyToken, UserController.getUserInfo)
/** Obtener la información del usuario que realiza la petición */
routes.get('/my_details',verifyToken, UserController.getMyInfo)
/** Obtiene la lista de los productos que ha publicado un usuario */
routes.post('/published',verifyToken, UserController.getPublishedProducts);
/** Registrar un nuevo usuario */
routes.post('/register', UserController.registerUser)
/** Login de un usuario */
routes.post('/login',UserController.sucessLogin)
/** Actualizar información de un usuario */
routes.put('/:id', verifyToken, UserController.updateUserInfo)
/** Eliminar un usuario */
routes.delete('/:id', verifyToken, UserController.deleteUser)

export default routes;