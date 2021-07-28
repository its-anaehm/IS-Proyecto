import { db } from "../config/database";

export class CommentService
{
    public static getComments = async(id: string) =>
    {
        const [row] = await db.query(`SELECT CONCAT(Usuario.Nombre,' ',Usuario.Apellido) AS 'usuario', Producto.id, Producto.Nombre AS 'nombreProducto', Comentario.Comentario as 'contenido', DATE_FORMAT(Comentario.Fecha_Publicacion, '%y-%m-%d') AS 'fecha' FROM Comentario JOIN Producto ON Comentario.fk_id_producto = Producto.id JOIN Usuario ON Comentario.fk_id_usuario = Usuario.id WHERE Comentario.fk_id_producto = ?`, [id]);
        let jsonCategory = JSON.parse(JSON.stringify(row));
        return jsonCategory;
    }
}

