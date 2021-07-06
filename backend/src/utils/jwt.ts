import jwt from "jsonwebtoken";

/**
 * Interface utilizada para retornar la información obtenida desde un token válido
 */
interface IPayload{
    id: Number;
    role: string;
}

/**
 * Clase encargada de manejar la funcionalidad relacionada con Json Web Token.
 */
export class JWT{
    private static secret: string = process.env.JWT_SECRET || 'mysupersecret'
    
    /**
     * Método encargado de generar un token nuevo utilizando la información del usuario solicitado.
     * @param id ID asignado para el usuario en la base de Datos.
     * @param role Rol asignado al usuario en la base de Datos.
     */
    public static generateToken = (id: Number, role: string) => {
        return jwt.sign({id, role}, JWT.secret, { expiresIn: '1h'} )
    }

    /**
     * Método encargado de verificar si el token recibido es un token válido
     * @returns El id y el rol que contiene el token recibido siempre que éste sea válido
     * @returns Error si el token no es válido o ya ha expirado
     * @param token Token recibido
     */
    public static verifyToken = (token: string) => {
        try{
            return jwt.verify(token, JWT.secret) as IPayload;
        }catch(err){
            throw err;
        }
    }

}