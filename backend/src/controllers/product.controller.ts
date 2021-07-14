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
        const product : Product = req.body
        product.images = ProductService.getImages(req.files)

        await ProductService.addProduct(product)

        res.send({message:'Product added'})
    }
}