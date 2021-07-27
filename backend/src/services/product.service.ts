import { Request } from "express";

import { db } from "../config/database";
import ProductController from "../controllers/product.controller";
import File from "../models/ImageFile";
import Product from "../models/Product";
import User from "../models/User";

export default class ProductService{
    
    public static getProductsImages = async ( productList: Array<Product>) => {
        for(let product of productList){
            product.images = []
            let [row] = await db.query("SELECT Nombre FROM Imagen WHERE Imagen.fk_id_producto = ?", [product.id])
            product.images.push(JSON.parse(JSON.stringify(row))[0]["Nombre"])
        }
        return productList
    }

    public static getAllProductsImages = async ( productList: Array<Product>) => {
        for(let product of productList){
            product.images = []
            let [row] = await db.query("SELECT Nombre FROM Imagen WHERE Imagen.fk_id_producto = ?", [product.id])
            product.images.push(JSON.parse(JSON.stringify(row)))
        }
        return productList
    }

    public static getImages = (files : Request["files"]) => {
        let images : Array<string> = []
        let requestImages : Array<File> = JSON.parse(JSON.stringify(files))["productImages"] || []

        requestImages.map( file => {
            images.push(file["filename"])
        })
        return images;
    }

    public static addProduct = async (product: Product, id: Number) => {
        const [row] = await db.query("INSERT INTO Producto(fk_id_usuario, fk_id_categoria, fk_id_departamento, fk_id_municipio, Nombre, Precio, Estado, Descripcion) VALUES (?,?,?,?,?,?,?,?)", 
                                    [ id, product.category, product.department, product.municipy, product.name, product.price, product.status, product.description ])

        const transformedRow = JSON.parse(JSON.stringify(row))

        product.images.map( async (image) => {
            await db.query("INSERT INTO Imagen(fk_id_producto, Nombre) VALUES (?,?)", [transformedRow.insertId, image] )
        })
    }

    public static getAllProducts = async () => {
        const [row] = await db.query(`SELECT id, fk_id_categoria AS category, fk_id_departamento AS department, fk_id_municipio AS municipy, Nombre AS name, Precio AS price,
            Descripcion AS description FROM Producto`)

        let productList : Array<Product> = (JSON.parse(JSON.stringify(row)))
        productList = await ProductService.getProductsImages(productList)
        
        return productList
    }
    
    public static getPopularProducts = async () => {
        const [ row ] = await db.query(`SELECT id, fk_id_categoria AS category, fk_id_departamento AS department, fk_id_municipio AS municipy, Nombre AS name, Precio AS price,
        Descripcion AS description FROM Producto ORDER BY Producto.Num_Visita DESC LIMIT 50`)
        
        let productList : Array<Product> = (JSON.parse(JSON.stringify(row)))
        productList = await ProductService.getProductsImages(productList)
        
        return productList
    }

    public static getAllProductsInfo = async () =>
    {
        const [ row ] = await db.query(`SELECT Producto.id AS 'id', Usuario.Nombre AS 'UNombre', Usuario.Apellido AS 'UApellido', Producto.Nombre AS 'Pname', Producto.Precio AS 'price', Producto.Descripcion AS 'description', Producto.Fecha_Publicacion AS 'date', Categoria.Nombre AS 'category', Departamento.Nombre AS 'department', Municipio.Nombre AS 'municipy' FROM Producto JOIN Categoria ON Producto.fk_id_categoria = Categoria.id JOIN Municipio ON Producto.fk_id_municipio = Municipio.id JOIN Departamento ON Producto.fk_id_departamento = Departamento.id JOIN Usuario ON Producto.fk_id_usuario = Usuario.id`);
        let jsonProductDetails: Array<Product> = JSON.parse(JSON.stringify(row));
        jsonProductDetails = await ProductService.getAllProductsImages(jsonProductDetails);
        return jsonProductDetails;
    }

    public static getCategoryProducts = async (id: string) =>
    {
        const [ row ] = await db.query(`SELECT Producto.id, Producto.Nombre AS 'name', Producto.Precio AS 'price',  Producto.Descripcion AS 'details', Producto.Fecha_Publicacion AS 'date' FROM Producto JOIN Categoria ON Producto.fk_id_categoria = Categoria.id WHERE Producto.fk_id_categoria = ?`, [id]);
        let jsonCategoryProducts: Array<Product> = JSON.parse(JSON.stringify(row));
        jsonCategoryProducts = await ProductService.getAllProductsImages(jsonCategoryProducts);
        return jsonCategoryProducts;
    }
}