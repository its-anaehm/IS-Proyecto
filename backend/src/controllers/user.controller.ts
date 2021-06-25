import { Handler } from "express";
import User from "../models/User";
import { UserService } from "../services/user.service";

export class UserController{

    public static registerUser: Handler = (req, res) => {
        const user: User = req.body;
        if (!UserService.isRegistered(user)){
            UserService.createAccount(user);
            res.status(200).send({message: 'User registered'})
        }else{
            res.status(400).send({message:"User already exists"});
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