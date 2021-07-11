import { db } from "../config/database";

export class CategoryService
{
    /**
     * Método encargado de obtener todas las categorías existentes en la base 
     * de datos.
     */
    public static categoryFilter = async () =>
    {
        const [row, fields] = await db.query('SELECT * FROM categoria');
        let jsonCategory = JSON.parse(JSON.stringify(row));
        return jsonCategory;   
    }

    /**
     * Método encargado de obtener todas las categorías más populares.
     */
    public static categoryPopular = async () =>
    {
        const [row, fields] = await db.query('SELECT Nombre, Imagen, Num_Visita FROM Categoria ORDER BY Num_Visita DESC LIMIT 6');
        let jsonCategoryPopular = JSON.parse(JSON.stringify(row));
        return jsonCategoryPopular;
    }
}