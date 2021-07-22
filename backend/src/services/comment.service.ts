import { db } from "../config/database";

export class CommentService
{
    public static getComments = async(id: Number) =>
    {
        const [row] = await db.query(`SELECT Usuario.Nombre AS 'userName', Usuario.Apellido AS 'userSurname', Producto.id, Producto.Nombre AS 'name', Comentario.Comentario, Comentario.Fecha_Publicacion AS 'Fecha' FROM Comentario JOIN Producto ON Comentario.fk_id_producto = Producto.id JOIN Usuario ON Comentario.fk_id_usuario = Usuario.id WHERE Comentario.fk_id_producto = ?`, [id]);
        let jsonCategory = JSON.parse(JSON.stringify(row));
        return jsonCategory;
    }
}