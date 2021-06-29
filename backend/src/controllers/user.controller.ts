import { Handler } from "express";
import User from "../models/User";
import { UserService } from "../services/user.service";
import { JWT } from "../utils/jwt";

export class UserController{

    /**
     * Método encargado de registrar un nuevo usuario en rl sistema.
     * @returns status 200 y mensaje de éxito si se registra de forma correcta.
     * @returns status 400 y mensaje de error si existe un problema al registar el usuario.
     * @param req Objeto de tipo Request
     * @param res Objeto de tipo Response
     */
    public static registerUser: Handler = async (req, res) => {
        try{
            const user: User = req.body;
            await UserService.createAccount(user)
            res.status(200).send({message: 'User registered'})
        }catch(err){
            if(err.errno == 1062){
                return res.status(400).send({message:"Email already exists"});
            }
            res.status(400).send({message: 'An error was ocurred'})
        }
    }

    /**
     * Método encargado de comprobar si la infomación de logueo recibida es correcta.
     * @returns status 200 y token si la infortmación recibida es correcta.
     * @returns status 400 y mensaje de error si el token enviado no es válido.
     * @returns status 400 y mensaje de error si el email o contraseña no son válidos.
     * @param req Objeto de tipo Request
     * @param res Objeto de tipo Response
     */
    public static sucessLogin: Handler = async (req, res) =>
    {
        const user: User = req.body;
        try
        {
            if(await UserService.checkPassword(user))
            {
                let token = JWT.generateToken(1,"user");
                try
                {
                    JWT.verifyToken(token);
                    res.status(200).send({message: 'Login Successful', token: token});
                }
                catch(err)
                {
                    res.status(400).send({message: 'Something went wrong.'});
                }
            }
            else
            {
                res.status(400).send({message: 'Incorrect Email/Password'})
            }
        }
        catch(err)
        {
            throw(err);
        }
    }
}
