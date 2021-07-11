import { Request } from "express";

import { db } from "../config/database";
import File from "../models/ImageFile";
import Product from "../models/Product";

export default class ProductService{
    
    private static getProductsImages = async ( productList: Array<Product>) => {
        for(let product of productList){
            product.images = []
            let [row] = await db.query("SELECT Nombre FROM Imagen WHERE Imagen.fk_id_producto = ? LIMIT 1", [product.id])
            product.images.push(`uploads/${JSON.parse(JSON.stringify(row))[0]["Nombre"]}`)
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

    public static addProduct = async (product: Product) => {
        const [row] = await db.query("INSERT INTO Producto(fk_id_categoria, fk_id_departamento, fk_id_municipio, Nombre, Precio, Descripcion) VALUES (?,?,?,?,?,?)", 
                                    [ product.category, product.department, product.municipy, product.name, product.price, product.description ])

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
}