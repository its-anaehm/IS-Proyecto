import jwt from "jsonwebtoken";

interface IPayload{
    user: {
        id: Number;
        role: string;
    };
}

export class JWT{
    private static secret: string = process.env.JWT_SECRET || 'mysupersecret'
    
    public static generateToken = (id: Number, role: string) => {
        return jwt.sign({id, role}, JWT.secret, { expiresIn: '1h'} )
    }

    public static verifyToken = (token: string) => {
        try{
            return jwt.verify(token, JWT.secret) as IPayload;
        }catch(err){
            throw err;
        }
    }

}