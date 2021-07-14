import { db } from "../config/database";
import Product from "../models/Product";
import ProductService from "./product.service";

export class HomeService
{
    public static wishlistList = async (id: Number) =>
    {
        const [row] = await db.query('SELECT Producto.Nombre AS "name", Producto.Precio AS "price", Producto.Descripcion AS "description", Lista_Deseo.fk_id_producto AS "id" FROM Lista_Deseo JOIN Usuario ON Lista_Deseo.fk_id_usuario = Usuario.id JOIN Producto ON Lista_Deseo.fk_id_producto = Producto.id WHERE Lista_Deseo.fk_id_usuario = ?', [id]);
        let jsonWishlist: Array<Product> = JSON.parse(JSON.stringify(row));
        jsonWishlist = await ProductService.getProductsImages(jsonWishlist);
        return jsonWishlist;
    }
}