import { db } from "../config/database";
import User from "../models/User";
import ProductService from "./product.service";

export class HomeService
{
    public static wishlistList = async (id: Number) =>
    {
        const [row] = await db.query('SELECT Usuario.Nombre AS "Usuario", Producto.Nombre AS "Nombre de Producto" FROM Lista_Deseo JOIN Usuario ON Lista_Deseo.fk_id_usuario = Usuario.id JOIN Producto ON Lista_Deseo.fk_id_producto = Producto.id WHERE Lista_Deseo.fk_id_usuario AND Lista_Deseo.fk_id_producto = ?', [id]);
        let jsonWishlist = JSON.parse(JSON.stringify(row));
        console.log(typeof(jsonWishlist));
        if(jsonWishlist.length > 0)
        {
            jsonWishlist = await ProductService.getProductsImages(jsonWishlist)
            return jsonWishlist;  
        }
        else
        {
            return "Lista de Deseo vacia.";
        }
    }
}