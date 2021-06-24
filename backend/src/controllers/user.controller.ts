import { Handler } from "express";

class UserController{
    
    public static getUsers: Handler = function(req, res) {
        res.status(400).send('Users API')
    }

    public static hello: Handler = function(req,res){
        res.send("Hola Mundo")
    }
}

export { UserController };