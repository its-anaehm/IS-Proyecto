import { Handler } from 'express';
import { CategoryService } from '../services/category.service';

export class CategoryController
{
    public static getCategory: Handler = async (req, res) =>
    {
        try
        {
            const categories = await CategoryService.categoryFilter();
            res.status(200).send({category: categories});
        }
        catch(err)
        {
            res.status(400).send({message: 'Error'});
        }
    }
}