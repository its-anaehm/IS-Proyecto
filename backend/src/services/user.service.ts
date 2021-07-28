import bcrypt from "bcrypt";

import User from "../models/User";
import { db } from "../config/database";
import { JWT } from "../utils/jwt";


export class UserService{

    /**
     * Método encargado de registrar una nueva cuenta de usuario en la base de datos. Se lanza una excepción si el correo ingresado existe
     * en la base o si ocurre otro tipo de error
     * @param user El usuario que se desea registrar en la base de Datos
     */
    public static createAccount = async (user: User) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        try{
           if(user.role){
               await db.query("INSERT INTO Usuario(Nombre, Apellido, Email, Telefono, Rol, Contrasena) VALUES (?, ?, ?, ?, ?, ?)", 
                                [user.firstName, 
                                user.lastName, 
                                user.email, 
                                user.phone,
                                user.role, 
                                user.password]
                            )
           }else{
               await db.query("INSERT INTO Usuario(Nombre, Apellido, Email, Telefono, Contrasena) VALUES (?, ?, ?, ?, ?)", 
                                [user.firstName, 
                                user.lastName, 
                                user.email, 
                                user.phone, 
                                user.password]
                            )
           }
        }catch(err){
            throw err;
        }
    }

    /**
     * Método encargado de obtener el rol del usuario desde la base de datos.
     * @param user La información del usuario que se desea loguear.
     */
    public static getUserRole = async (user:User) =>
    {
        const [row, fields] = await db.query('SELECT Rol FROM `Usuario` WHERE `Email` = ?', [user.email]);
        let jsonRole = JSON.parse(JSON.stringify(row));
        for (const result of jsonRole)
        {
            return result.Rol;
        }
    }

    /**
     * Método encargado de verificar si la contraseña recibida es igual a la contraseña que se encuentra almacenada en la base de Datos.
     * @param user La información del usuario que se desea loguear.
     */
    public static checkPassword = async (user: User) =>
    {
        const [row, fields] = await db.query('SELECT Contrasena FROM `Usuario` WHERE `Email` = ?', [user.email]);
        const [rowTwo, fieldsTwo] = await db.query('SELECT * FROM `Usuario` WHERE `Email` = ?', [user.email]);
        let jsonPassword = JSON.parse(JSON.stringify(row));
        let jsonEmails = JSON.parse(JSON.stringify(rowTwo));
        try
        {
            for (const result of jsonPassword)
            {
                for (const resultTwo of jsonEmails)
                {
                    const match = bcrypt.compare(user.password, result.Contrasena);
                    if(await match && user.email == resultTwo.Email) 
                    {
                        console.log("Positive response from Password and Email");
                        return true;
                    }
                    else
                    {
                        console.log("Negative response from Password and Email");
                        return false;
                    }
                }
            }
        }
        catch(err)
        {
            throw(err);
        }
    }

    /**
     * Método encargado de generar el token que contiene el id y rol del usuario que se desea loguear.
     * @returns Un token el cual contiene el id y el rol del usuario.
     * @param user Refiere al usuario que se desea loguear.
     */
    public static getUserToken = async(user: User) => {
        const [row] = await db.query('SELECT id, Rol FROM Usuario WHERE Usuario.email = ?', [user.email])
        let {id, Rol} = JSON.parse(JSON.stringify(row))[0];
        return JWT.generateToken(id, Rol)
    }

    /**
     * Método encargado de obtener el límite que será utilizado en la consulta SQL.
     * @param pageNumber El parámetro enviado en la petición
     * @returns 0 si el parametro enviado es 1
     * @returns 20*n donde n es el parámetro enviado en la petición, siempre que n sea distinto a 1.
     */
    private static getLimit = (pageNumber: String) => {
        if(Number(pageNumber) === 1){
            return 0
        }
        return Number(pageNumber) * 20;
    }

    /**
     * Método encargado de obtener un arreglo de 20 elementos que contienen el id, Nombre, Apellido, Teléfono y Correo de los usuarios
     * registrados en la aplicación.
     * @param pageNumber Número de página enviado como parámetro en la petición recibida.
     * @returns Un arreglo de tamaño 20 con la información de los usuarios registrados.
     */
    public static getUsers = async(pageNumber: string) => {
        let limit = UserService.getLimit(pageNumber)
        const [row] = await db.query('SELECT id, Nombre, Apellido, Email, Telefono FROM Usuario ORDER BY Nombre, Apellido DESC LIMIT ?,20;',
                                    [limit])
        let usersList = JSON.parse(JSON.stringify(row));
        return usersList;
    }

    /**
     * Método encargado de obtener la información de un usuario mediante su id.
     * @returns un objeto JSON que contiene el ID, nombre, apellido, email y tekéfono del usuario
     * @param id ID del usuario sobre el cual se quiere obtener su información
     */
    public static getUser = async (id: Number) => {
        const [row] = await db.query('SELECT id, Nombre, Apellido, Email, Telefono FROM Usuario WHERE Usuario.id = ?', [id])
        let transformedRow = JSON.parse(JSON.stringify(row)); 
        
        if(transformedRow.length === 1){
            return transformedRow[0];
        }
    }

    /**
     * Método encargado de actualizar la información de un usuario. Lanza una excepción si ocurre un error al momento de actualizar la información.
     * @returns La información actualizada del usuario.
     * @param id Se refiere al id perteneciente al usuario
     * @param user Entidad que contiene la información que se desea actualizar.
     */
    public static updateUserInfo = async (id: string, user: User) => {
        try{
            await db.query('UPDATE Usuario SET Nombre = ?, Apellido = ?, Email = ?, Telefono = ? WHERE Usuario.id = ?',
                                        [ user.firstName, user.lastName, user.email, user.phone, id]
            )
            return UserService.getUser(Number(id));
        }catch(err){
            throw err;
        }
    }
 
    /**
     * Método encargado de eliminar la información de un usuario. Lanza una excepción si ocurre un error al momento de eliminar la información.
     * @param id ID perteneciente al usuario que se desea eliminar.
     */
    public static deleteUser = async (id: string) => {
        try{
            await db.query('DELETE FROM Usuario WHERE Usuario.id = ?', [id]);
        }catch(err) {
            throw err;
        }
    }

    public static publishedProducts = async (id: Number) =>
    {
        const [ row ] = await db.query(`SELECT Producto.id, Producto.Nombre AS 'published', DATE_FORMAT(Producto.Fecha_Publicacion, '%y-%m-%d') AS 'date', Imagen.Nombre AS 'image' FROM Producto JOIN Usuario ON Producto.fk_id_usuario = Usuario.id JOIN Imagen on Imagen.fk_id_producto = Producto.id WHERE Producto.fk_id_usuario = ?`, [id]);
        let jsonProductDetails = JSON.parse(JSON.stringify(row));
        return jsonProductDetails;
    }
}