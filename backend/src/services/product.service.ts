import { Request } from "express";

import { db } from "../config/database";
import File from "../models/ImageFile";
import Product from "../models/Product";

export default class ProductService{
    
    public static getImages = (files : Request["files"]) => {
        let images : Array<string> = []
        let requestImages : Array<File> = JSON.parse(JSON.stringify(files))["productImages"] || []

        requestImages.map( file => {
            images.push(file["filename"])
        })
        return images;
    }

    public static addProduct = async (product: Product) => {
        const [row] = await db.query("INSERT INTO Producto(fk_id_categoria, Nombre, Precio, Descripcion) VALUES (?,?,?,?)", 
                                    [ product.category, product.name, product.price, product.description ])

        const transformedRow = JSON.parse(JSON.stringify(row))

        product.images.map( async (image) => {
            await db.query("INSERT INTO Imagen(fk_id_producto, Nombre) VALUES (?,?)", [transformedRow.insertId, image] )
        })
    }
}