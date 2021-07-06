import { Handler } from "express";

export class HomeController
{
    public static verifyLogin: Handler = async (req, res) =>
    {
        try
        {
            res.status(200).send({message: 'User is logged in'});
        }
        catch(err)
        {
            res.status(400).send({message: 'Forbbiden'});
        }
    }
}