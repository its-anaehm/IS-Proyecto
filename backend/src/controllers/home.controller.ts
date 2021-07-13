import { Handler } from "express";
import { HomeService } from "../services/home.service";

export class HomeController
{
    public static verifyWishlist: Handler = async (req, res) =>
    {
        try
        {
            const wishlist = await HomeService.wishlistList(req.user.id);
            res.status(200).send({message: wishlist});
        }
        catch(err)
        {
            console.log(err);
            res.status(400).send({message: err});
        }
    }
}