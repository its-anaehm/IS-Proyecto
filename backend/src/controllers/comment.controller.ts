import { Handler } from 'express';
import { CommentService } from '../services/comment.service';

export class CommentController
{
    public static getProductComment: Handler = async (req,res) =>
    {
        try
        {
            const comments = await CommentService.getComments(req.body.productID);
            res.status(200).send({comments: comments});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }
}