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
            res.status(400).send({message: err});
        }
    }

    public static getSubscribed: Handler = async (req,res) =>
    {
        try
        {
            const wishlist = await HomeService.subscribeToWishlist(req.user.id, req.body.productID);
            if(wishlist == true)
            {
                res.status(400).send({message: 'User is already subscribed'});
            }
            else
            {
                res.status(200).send({message: 'Subscribed to product'});
            }
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }
}