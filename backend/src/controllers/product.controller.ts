import { Handler } from 'express';

import ProductService from "../services/product.service";
import DepartmentService from "../services/department.service";
import MunicipyService from "../services/municipy.service";

import Product from '../models/Product';
import { CategoryService } from '../services/category.service';

export default class ProductController{

    public static getAllProducts: Handler = async (req, res) => {
        
        const page = req.params.page
        const productList = await ProductService.getAllProducts(page)
        const productCount = await ProductService.getAllProductsCount();
    
        res.status(200).send({message: productList, productCount})
    }

    public static getProductsNoPage: Handler = async (req, res) => {
        
        const productList = await ProductService.getAllProductsNoPage()
        res.status(200).send(productList)
    }

    public static getProductsNoPageLimit: Handler = async (req, res) => {
        
        const productList = await ProductService.getAllProductsNoPageLimit()
        res.status(200).send(productList)
    }

    public static getProductsNoPageConfig: Handler = async (req, res) => {
        
        const productList = await ProductService.getAllProductsNoPageConfig()
        res.status(200).send(productList)
    }

    public static getOneProduct: Handler = async (req,res) => {
        const product = await ProductService.getProduct(req.params.id)
        res.status(200).send(product);
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
    
            let idProduct = await ProductService.addProduct(product, req.user.id)

            return res.send({message:'Product added', id: idProduct})
        }
        res.status(400).send({message: 'Invalid user'})
    }


    public static deleteProduct : Handler = async (req, res) => {
        if(req.user.role !== 'guest'){
            await ProductService.deleteProduct(req.params.id,Number(req.params.type))
            return res.status(200).send({message: 'Product deleted'})
        }
        res.status(401).send('Unauthorized user')
    }

    public static productDetail: Handler = async (req, res) =>
    {
        try
        {
            const page = req.params.page
            const productInfo = await ProductService.getAllProductsInfo(page);
            const productCount = await ProductService.getProductsCount();
            res.status(200).send({message: productInfo, productCount});
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
            const productCategory = await ProductService.getCategoryProducts(req.params.id);
            const categoryNmae = await CategoryService.getCategoryName(req.params.id)
            res.status(200).send({categoryName: categoryNmae, message: productCategory});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }
}