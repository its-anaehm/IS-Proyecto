import User from "../models/User";
import bcrypt from "bcrypt";
import { db } from "../database";

export class UserService{

    public static createAccount = async (user: User) => {
    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        try{
           await db.query("INSERT INTO User(first_name, last_name, txt_email, telephone,txt_password) VALUES (?, ?, ?, ?, ?)", [user.firstName, user.lastName, user.email, user.phone, user.password])
        }catch(err){
            throw err;
        }
    }
}