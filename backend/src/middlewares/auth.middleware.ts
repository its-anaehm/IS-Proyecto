import { Request, Response, NextFunction } from "express";
import { JWT } from "../utils/jwt";

/**
 * Interfaz que extiende de Request y la cual contiene un campo "user" para poder almacenar la información como el id del usuario y su rol
 */
interface AuthInfoRequest extends Request{
    user: {
        id: Number;
        role: string;
    };
}

/**
 * Función encargada de verificar si el usuario que realiza la petición es un usuario registrado. En caso que sea una usuario registrado
 * se verifica que el token enviado sea válido.
 * @param req Objeto de tipo AuthInfoRequest para almacenar los datos del usuario que realiza la petición.
 * @param res Objeto de tipo Response
 * @param next Objeto de tipo NextFunction
 */
export const verifyToken = (req: AuthInfoRequest, res: Response, next: NextFunction) => {
    const token: string = <string>req.headers['Authorization'];
    if(token === null){
        req.user = {
            id: 0,
            role: 'guest'
        }
        next()
    }
    try{
        const payload = JWT.verifyToken(token)
        req.user = payload.user;
        next()
    }catch(err){
        res.status(400).send({message: 'Invalid Token'})
    }
}