import { Handler } from "express";

export class UserController{
    
    public static getUsers:Handler = function(req, res) {
        res.status(200).send('Users API')
    }
}