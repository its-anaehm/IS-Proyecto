import { Handler } from 'express';
import { CommentService } from '../services/comment.service';

export class CommentController
{
    public static getProductComment: Handler = async (req,res) =>
    {
        try
        {
            const comments = await CommentService.getComments(req.params.id);
            res.status(200).send({comments: comments});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }
    public static publishComment: Handler = async (req,res) =>
    {
        try
        {
            const comments = await CommentService.publishComments(req.params.userid,req.params.productid,req.body.comment);
            res.status(200).send({comments: 'Success'});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }
}