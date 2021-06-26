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
            else{
                throw err;
            }
        }
    }

    public static sucessLogin: Handler = async (req, res) =>
    {
        const user: User = req.body;
        try
        {
            if(await UserService.checkPassword(user))
            {
                res.status(200).send({message: 'Login Successful'})
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
