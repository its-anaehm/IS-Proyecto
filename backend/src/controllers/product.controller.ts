import { Handler } from 'express';

import ProductService from "../services/product.service";
import Product from '../models/Product';

export default class ProductController{
    public static addProduct : Handler = async (req, res) => {
        const product : Product = req.body
        product.images = ProductService.getImages(req.files)

        await ProductService.addProduct(product)

        res.send({message:'Response xd'})
    }
}