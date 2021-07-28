import { db } from "../config/database";
import Product from "../models/Product";
import ProductService from "./product.service";

export class HomeService
{
    public static wishlistList = async (id: Number) =>
    {
        const [row] = await db.query('SELECT Lista_Deseo.fk_id_producto AS "id", Producto.Nombre AS "name", Producto.Precio AS "price" FROM Lista_Deseo JOIN Usuario ON Lista_Deseo.fk_id_usuario = Usuario.id JOIN Producto ON Lista_Deseo.fk_id_producto = Producto.id WHERE Lista_Deseo.fk_id_usuario = ?', [id]);
        console.log(row);
        let jsonWishlist: Array<Product> = JSON.parse(JSON.stringify(row));
        jsonWishlist = await ProductService.getProductsImages(jsonWishlist);
        return jsonWishlist;
    }
    public static subscribeToWishlist = async (user_id: Number, product_id: string) =>
    {
        if(await HomeService.verifySubscription(user_id,product_id) == true)
        {
            return true;
        }
        else
        {
            const [row] = await db.query('INSERT INTO Lista_Deseo (fk_id_usuario, fk_id_producto) VALUES (?,?)', [user_id, product_id]);
            let jsonWishlistSub = JSON.parse(JSON.stringify(row));
            return jsonWishlistSub; 
        }
    }
    public static verifySubscription = async (user_id: Number, product_id: string) =>
    {
        const [row] = await db.query('SELECT fk_id_producto FROM Lista_Deseo WHERE fk_id_usuario = ? AND fk_id_producto = ?', [user_id, product_id]);
        let jsonWishlistSub = JSON.parse(JSON.stringify(row));
        if(jsonWishlistSub.length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    public static removeSubscription = async (user_id: Number, product_id: string) =>
    {
        const [row] = await db.query('DELETE FROM Lista_Deseo WHERE fk_id_usuario = ? AND fk_id_producto = ?', [user_id, product_id]);
    }
}