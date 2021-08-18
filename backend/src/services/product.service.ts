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
    
    public static getProductImages = async ( product: Product) => {
        product.images = []
        let [row] = await db.query("SELECT Nombre FROM Imagen WHERE Imagen.fk_id_producto = ?", [product.id])
        if(JSON.parse(JSON.stringify(row)).length > 0){
            for(let i = 0; i < JSON.parse(JSON.stringify(row)).length; i++){
                product.images.push(JSON.parse(JSON.stringify(row))[i]["Nombre"])
            }
        }
        return product
    }
    
    
    public static getAllProductsImages = async ( productList: Array<Product>) => {
        for(let product of productList){
            product.images = []
            let [row] = await db.query("SELECT Nombre FROM Imagen WHERE Imagen.fk_id_producto = ?", [product.id])
            if(JSON.parse(JSON.stringify(row)).length > 0){
                product.images.push(JSON.parse(JSON.stringify(row))[0]["Nombre"])
            }
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
        return transformedRow.insertId;
    }
    
    public static getAllProducts = async (page: string) => {
        const [row] = await db.query(`CALL pagination(${page}, 10, 1)`)
        
        let productList : Array<Product> = (JSON.parse(JSON.stringify(row))[0])
        productList = await ProductService.getProductsImages(productList)
        
        return productList
    }

    public static getAllProductsNoPage = async () => {
        const [row] = await db.query(`SELECT id, fk_id_categoria AS category, fk_id_departamento AS department, fk_id_municipio AS municipy, Nombre AS name, Precio AS price, Descripcion AS details FROM Producto`)
        // SELECT Producto.id, Producto.Nombre AS 'name', Departamento.Nombre AS 'departmento', Producto.Precio AS 'price' FROM Producto JOIN Departamento ON Producto.fk_id_departamento = Departamento.id
        
        let productList : Array<Product> = (JSON.parse(JSON.stringify(row)))
        productList = await ProductService.getProductsImages(productList)
        
        return productList
    }
    
    public static updateVisits = async (id: string) => {
        let [row] = await db.query("UPDATE Producto SET Num_Visita = Num_Visita + 1 WHERE Producto.id = ?", [id])
    }

    public static getProduct = async (id: string) => {
        let [row] = await db.query("SELECT Producto.id AS 'id', Producto.fk_id_usuario AS 'vendorID', CONCAT(Usuario.Nombre,' ',Usuario.Apellido) AS 'owner', Producto.Nombre AS 'name', FORMAT(Producto.Precio,2) AS 'price', Producto.Descripcion AS 'details', DATE_FORMAT(Producto.Fecha_Publicacion, '%y-%m-%d') AS 'date', Categoria.id AS 'category', Departamento.Nombre AS 'department', Municipio.Nombre AS 'municipy' FROM Producto JOIN Categoria ON Producto.fk_id_categoria = Categoria.id JOIN Municipio ON Producto.fk_id_municipio = Municipio.id JOIN Departamento ON Producto.fk_id_departamento = Departamento.id JOIN Usuario ON Producto.fk_id_usuario = Usuario.id WHERE Producto.id = ? ", [id]);

        await ProductService.updateVisits(id)
        let jsonProductDetails: Array<Product> = JSON.parse(JSON.stringify(row));
        jsonProductDetails = await ProductService.getProductsImages(jsonProductDetails);
        return jsonProductDetails;
    }
    
    public static getPopularProducts = async () => {
        const [ row ] = await db.query(`SELECT id, fk_id_categoria AS category, fk_id_departamento AS department, fk_id_municipio AS municipy, Nombre AS name, FORMAT(Precio,2) AS price,
        Descripcion AS details FROM Producto WHERE Producto.Disponibilidad = "Disponible" ORDER BY Producto.Num_Visita DESC LIMIT 50`)
        
        let productList : Array<Product> = (JSON.parse(JSON.stringify(row)))
        productList = await ProductService.getProductsImages(productList)
        return productList
    }

    public static getAllProductsInfo = async (page: string) =>
    {
        const [ row ] = await db.query(`CALL pagination(${page}, 9, 2)`);
        let jsonProductDetails: Array<Product> = JSON.parse(JSON.stringify(row))[0];
        jsonProductDetails = await ProductService.getAllProductsImages(jsonProductDetails);
        return jsonProductDetails;
    }

    public static getCategoryProducts = async (id: string) =>
    {
        const [ row ] = await db.query(`SELECT Producto.id, Producto.Nombre AS 'name', FORMAT(Producto.Precio,2) AS 'price',  Producto.Descripcion AS 'details', DATE_FORMAT(Producto.Fecha_Publicacion, '%y-%m-%d') AS 'date' FROM Producto JOIN Categoria ON Producto.fk_id_categoria = Categoria.id WHERE Producto.Disponibilidad = "Disponible" AND Producto.fk_id_categoria = ?`, [id]);
        let jsonCategoryProducts: Array<Product> = JSON.parse(JSON.stringify(row));
        jsonCategoryProducts = await ProductService.getAllProductsImages(jsonCategoryProducts);
        return jsonCategoryProducts;
    }

    public static deleteProduct = async(id: string, type: Number) => {
        if(type == 0)
        {
            await db.query(`UPDATE Producto SET Disponibilidad = 'Retirado' WHERE Producto.id = ?`, [id, type])       
        }
        else if(type == 1)
        {
            await db.query(`UPDATE Producto SET Disponibilidad = 'Vendido' WHERE Producto.id = ?`, [id, type])     
        }
    }
}