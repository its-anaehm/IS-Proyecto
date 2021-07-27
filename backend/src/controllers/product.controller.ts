import { Handler } from 'express';

import ProductService from "../services/product.service";
import DepartmentService from "../services/department.service";
import MunicipyService from "../services/municipy.service";

import Product from '../models/Product';

export default class ProductController{

    public static getAllProducts: Handler = async (req, res) => {
        
        const productList = await ProductService.getAllProducts()
        for( let product of productList){
            product.department = await DepartmentService.getDepartment(product.department)
            product.municipy = await MunicipyService.getMunicipy(product.municipy)
        }
        res.send(productList)
    }
    
    public static getPopularProducts : Handler = async (req, res) => {
        
        const productList = await ProductService.getPopularProducts()
        for( let product of productList){
            product.department = await DepartmentService.getDepartment(product.department)
            product.municipy = await MunicipyService.getMunicipy(product.municipy)
        }
        res.send(productList)

    }

    public static addProduct : Handler = async (req, res) => {
        if(req.user.role !== 'guest'){
            const product : Product = req.body
            product.images = ProductService.getImages(req.files)
    
            await ProductService.addProduct(product, req.user.id)

            return res.send({message:'Product added'})
        }
        res.status(400).send({message: 'Invalid user'})
    }

    public static productDetail: Handler = async (req, res) =>
    {
        try
        {
            const productInfo = await ProductService.getAllProductsInfo();
            res.status(200).send({message: productInfo});
        }
        catch(err)
        {
            console.log(err)
            res.status(400).send({message: err});
        }
    }

    public static productCategory: Handler = async (req, res) =>
    {
        try
        {
            const productCategory = await ProductService.getCategoryProducts(req.body.productID);
            res.status(200).send({message: productCategory});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }
}