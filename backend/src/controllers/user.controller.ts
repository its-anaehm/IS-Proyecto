import { Handler } from "express";
import User from "../models/User";
import { UserService } from "../services/user.service";

export class UserController{

    public static registerUser: Handler = async (req, res) => {
        try{
            const user: User = req.body;
            await UserService.createAccount(user)
            res.status(200).send({message: 'User registered'})
        }catch(err){
            if(err.errno == 1062){
                res.status(400).send({message:"Email already exists"});
            }
        }
    }
}

export class Login
{
    public static sucessLogin: Handler = function(req, res)
    {
        res.status(200).send({message: 'Login Successful'})
    }
}