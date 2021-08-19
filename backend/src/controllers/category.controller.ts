import { Handler } from 'express';
import { CategoryService } from '../services/category.service';

export class CategoryController
{
    /**
     * Método encargado de obtener la lista de las categorías.
     * @returns status 200 y un arreglo de tamaño 20 con la información de los usuarios.
     * @returns status 401 si el usuario que realiza la petición no es un administrador.
     * @param req Objeto de tipo Request
     * @param res Objeto de tipo Response
     */
    public static getCategory: Handler = async (req, res) =>
    {
        try
        {
            const categories = await CategoryService.categoryFilter();
            res.status(200).send({category: categories});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }

    /**
     * Método encargado de obtener la lista de las categorías más populares.
     * @returns status 200 y un arreglo de tamaño 20 con la información de los usuarios.
     * @returns status 401 si el usuario que realiza la petición no es un administrador.
     * @param req Objeto de tipo Request
     * @param res Objeto de tipo Response
     */
    public static getPopularCategories: Handler = async (req, res) =>
    {
        try
        {
            const categoriesMostPopular = await CategoryService.categoryPopular();
            res.status(200).send({popular: categoriesMostPopular});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }

    public static getSuscribedCategories: Handler = async (req, res) => {
        const categories = await CategoryService.getSuscribedCategories(req.user.id)

        res.status(200).send({suscribedCategories: categories})
    }

    public static suscribeToCategory: Handler = async (req, res) => {
        await CategoryService.addSuscribedCategory(req.params.id, req.user.id)

        res.status(201).send({message: 'Category suscribed'})
    }

    public static unsuscribeToCategory: Handler = async (req, res) =>
    {
        await CategoryService.removeSuscribedCategory(req.params.id, req.user.id)
        res.status(200).send({message: 'Unsuscribed from category'})
    }
    public static removeCategory: Handler = async (req, res) =>
    {
        await CategoryService.removeCategory(req.params.id)
        res.status(200).send({message: 'Category Removed'})
    }
    public static getCategoryConfig: Handler = async (req, res) =>
    {
        let category = await CategoryService.categoryConfig()
        res.status(200).send({message: category})
    }
}