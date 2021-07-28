import { db } from "../config/database";

export class CommentService
{
    public static getComments = async(id: string) =>
    {
        const [row] = await db.query(`SELECT CONCAT(Usuario.Nombre,' ',Usuario.Apellido) AS 'usuario', Comentario.Comentario as 'contenido', DATE_FORMAT(Comentario.Fecha_Publicacion, '%y-%m-%d') AS 'fecha' FROM Comentario JOIN Producto ON Comentario.fk_id_producto = Producto.id JOIN Usuario ON Comentario.fk_id_usuario = Usuario.id WHERE Comentario.fk_id_producto = ? ORDER BY Comentario.Comentario DESC`, [id]);
        let jsonCategory = JSON.parse(JSON.stringify(row));
        return jsonCategory;
    }
    public static publishComments = async(user_id: string, product_id:string, comment: string) =>
    {
        const [row] = await db.query(`INSERT INTO Comentario(fk_id_usuario,fk_id_producto,Comentario,Fecha_Publicacion) VALUES (?,?,?,NOW())`, [user_id,product_id,comment]);
        let jsonCategory = JSON.parse(JSON.stringify(row));
        return jsonCategory;
    }
}

