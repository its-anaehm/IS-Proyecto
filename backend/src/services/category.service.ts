import { db } from "../config/database";

export class CategoryService
{
    /**
     * Método encargado de obtener todas las categorías existentes en la base 
     * de datos.
     */
    public static categoryFilter = async () =>
    {
        const [row, fields] = await db.query('SELECT * FROM Categoria');
        let jsonCategory = JSON.parse(JSON.stringify(row));
        return jsonCategory;   
    }

    /**
     * Método encargado de obtener todas las categorías más populares.
     */
    public static categoryPopular = async () =>
    {
        const [row, fields] = await db.query('SELECT id, Nombre, Imagen, Num_Visita FROM Categoria ORDER BY Num_Visita DESC LIMIT 6');
        let jsonCategoryPopular = JSON.parse(JSON.stringify(row));
        return jsonCategoryPopular;
    }

    public static getSuscribedCategories = async (id: Number) => {
        let [ row ] = await db.query(`SELECT Suscripcion_Categoria.fk_id_categoria, Categoria.Nombre, Categoria.Imagen, Categoria.Num_Visita 
                        FROM Suscripcion_Categoria INNER JOIN Categoria ON Suscripcion_Categoria.fk_id_categoria = Categoria.id 
                        WHERE Suscripcion_Categoria.fk_id_usuario = ?`, [ id ])

        return JSON.parse(JSON.stringify(row));
    }

    public static addSuscribedCategory = async (category_id: string, user_id: Number ) => {
        await db.query('INSERT INTO Suscripcion_Categoria(fk_id_usuario, fk_id_categoria) VALUES (?,?)', [user_id, category_id])
    }
}
