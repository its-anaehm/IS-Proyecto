import { Handler } from "express";
import User from "../models/User";
import { UserService } from "../services/user.service";
import { JWT } from "../utils/jwt";

/**
 * Clase controlador encargada de manejar todas las peticiones relacionadas con la entidad Usuario
 */
export class UserController{

    /**
     * Método encargado de manejar la petición para obtener la lista de usuarios registrados.
     * @returns status 200 y un arreglo de tamaño 20 con la información de los usuarios.
     * @returns status 401 si el usuario que realiza la petición no es un administrador.
     * @param req Objeto de tipo Request
     * @param res Objeto de tipo Response
     */
    public static getUsersInfo : Handler = async (req, res) => {
        if(req.user.role === 'Administrador'){
            const usersList = await UserService.getUsers(req.params.page)
            return res.status(200).send(usersList)
        }
        res.status(401).send({message: 'Unauthorized user'})
    }

    /**
     * Método encargado de obtener la información perteneciente al usuario que se encuentra logueado en la aplicación
     * @returns status 401 y mensaje de error si el usuario que realiza la petición no se ha logueado.
     * @returns status 200 y la información del usuario solamente si el usuario se encuentra logueado.
     * @param req Objeto de tipo Request
     * @param res Objeto de tipo Response
     */
    public static getMyInfo: Handler = async (req, res) => {
        if(req.user.role === 'guest'){
            return res.status(401).send({message: 'Unauthorized user'})
        }
        const userInfo = await UserService.getUser(req.user.id)
        return res.status(200).send(userInfo)
    }

    /**
     * Método encargado de obtener la información de cualquier usuario registrado en la aplicación mediante su id.
     * @returns status 401 y mensaje de error si el usuario que realiza la petición no se ha logueado.
     * @returns status 200 y la información del usuario al cual pertenece el id, simepre que el usuario que realiza la petición se encuentra logueado.
     * @param req Objeto de tipo Request
     * @param res Objeto de tipo Response
     */
    public static getUserInfo: Handler = async (req, res) => {
        if(req.user.role === 'guest'){
            return res.send(401).send({message: 'Unauthorized user'})
        }
        const userInfo = await UserService.getUser(req.user.id)
        return res.status(200).send(userInfo)
    }
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
        const user:User = req.body;
        try
        {
            if(await UserService.checkPassword(user))
            {
                let token = await UserService.getUserToken(user);
                let role = await UserService.getUserRole(user);
                try
                {
                    JWT.verifyToken(token);
                    res.status(200).send({message: 'Login Successful', token: token, rol: role});
                }
                catch(err)
                {
                    console.log(err);
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

    /**
     * Método encargado de manejar la petición de actualización de información de un usuario.
     * @returns status 200 y la información del usuario actualizada si el usuario que envia la petición es administrador.
     * @returns status 200 y la información del usuario actualizada si el usuario que envia la petición posee el rol usuario pero desea actualizar
     * su propia información.
     * @returns status 401 si el usuario que realiza la petición no se encuentra logueado.
     * @returns status 401 si el usuario que realiza la petición se encuentra logueado pero intenta modificar la información de otro usuario 
     * sin poseer el rol de administrador.
     * @returns status 400 si ocurre un error al tratar de actualizar la información.
     * @param req Objeto de tipo Request
     * @param res Objeto de tipo Response
     */
    public static updateUserInfo: Handler = async (req, res) => {
        try{
            const user:User = req.body;
            if(req.user.role === 'Administrador'){
                let updatedInfo = await UserService.updateUserInfo(req.params.id, user)
                return res.status(200).send(updatedInfo)
            }
            
            if(req.user.role === 'Usuario' && req.user.id === Number(req.params.id)){
                let updatedInfo = await UserService.updateUserInfo(req.params.id, user)
                return res.status(200).send(updatedInfo)
            }
         
            res.status(401).send({message:'Unauthorized user'})
        }catch(err){            
            if(err.errno === 1062){
                res.status(400).send({message:'Email already exists'})
            }
            res.status(400).send({message:'An error was ocurred'})
        }
    }
    
    /**
     * Método encargado de manejar la petición de eliminación de información de un usuario.
     * @returns status 200 si el usuario que envia la petición es administrador.
     * @returns status 200 si el usuario que envia la petición posee el rol usuario pero desea eliminar su propio perfil.
     * @returns status 401 si el usuario que realiza la petición no se encuentra logueado.
     * @returns status 401 si el usuario que realiza la petición se encuentra logueado pero intenta eliminar la información de otro usuario
     * sin poseer el rol de administrador.
     * @returns status 400 si ocurre un error al tratar de eliminar la información.
     * @param req Objeto de tipo Request
     * @param res Objeto de tipo Response
     */
    public static deleteUser: Handler = async(req, res) => {
        try{
            if(req.user.role === 'Administrador'){
                await UserService.deleteUser(req.params.id)
                return res.status(200).send({message:'User deleted'})
            }
            
            if(req.user.role === 'Usuario' && req.user.id === Number(req.params.id)){
                await UserService.deleteUser(req.params.id)
                return res.status(200).send({message:'User deleted'})
            }
         
            res.status(401).send({message:'Unauthorized user'})
        }catch(err){
            res.status(401).send({message:'An error was ocurred'})
        }
    }

    public static getPublishedProducts: Handler = async(req, res) =>
    {
        try
        {
            const published = await UserService.publishedProducts(req.user.id);
            res.status(200).send({message: published});
        }
        catch(err)
        {
            res.status(400).send({message: err})
        }
    }

}
