import { Request, Response, NextFunction } from "express";
import { JWT } from "../utils/jwt";

interface AuthInfoRequest extends Request{
    user: {
        id: Number;
        role: string;
    };
}

export const verifyToken = (req: AuthInfoRequest, res: Response, next: NextFunction) => {
    const token: string = <string>req.headers['Authorization'];
    if(token === null) res.status(401).send({message: 'Token no provided'})

    try{
        const payload = JWT.verifyToken(token)
        req.user = payload.user;
        next()
    }catch(err){
        res.status(400).send({message: 'Invalid Token'})
    }
}