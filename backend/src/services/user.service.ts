import User from "../models/User";
import bcrypt from "bcrypt";

export class UserService{
    public static isRegistered = (user: User) : boolean => {
        return false;
    }

    public static createAccount = async (user: User) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        console.log(user);
    }
}