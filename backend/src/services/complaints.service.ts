import { db } from "../config/database";

export class ComplaintsService
{
    public static makeComplaint = async(accuser_id: string,accused_id: string,complaint_id: string) =>
    {
        const [row] = await db.query(`INSERT INTO Denuncia(fk_id_denunciador,fk_id_acusado,Fecha_denuncia,Tipo_Denuncia) VALUES (?,?,NOW(),?)`, [accuser_id,accused_id,complaint_id]);
        let jsonMakeComplaint = JSON.parse(JSON.stringify(row));
        return jsonMakeComplaint;
    }
    public static listComplaints = async() =>
    {
        const [row] = await db.query(`SELECT Denuncia.id, Denuncia.fk_id_denunciador, Denuncia.fk_id_acusado, CONCAT(Usuario.Nombre,' ',Usuario.Apellido) AS 'NombreDenunciador', (SELECT CONCAT(Usuario.Nombre,' ',Usuario.Apellido) AS 'NombreAcusado' FROM Denuncia JOIN Usuario ON Denuncia.fk_id_acusado = Usuario.id) AS 'NombreAcusado', DATE_FORMAT(Denuncia.Fecha_denuncia, '%y-%m-%d') AS 'date', Tipo_Denuncia, Denuncia.Estado FROM Denuncia JOIN Usuario ON Denuncia.fk_id_denunciador = Usuario.id`);

        let jsonListComplaints = JSON.parse(JSON.stringify(row));

        return jsonListComplaints;
    }
    public static listComplaintsLimit = async() =>
    {
        const [row] = await db.query(`SELECT * FROM Denuncia LIMIT 5`);
        let jsonListComplaintsLimit = JSON.parse(JSON.stringify(row));
        return jsonListComplaintsLimit;
    }
    public static verifyComplaint = async(state_id: string, complaint_id: string) =>
    {
        //Aprobado: 1, Desestimado: 0
        if(state_id == '1')
        {
            console.log('Aprobado');
            const [row] = await db.query(`UPDATE Denuncia SET Estado = 'Aprobado' WHERE id = ?`, [complaint_id]);
            let jsonCategory = JSON.parse(JSON.stringify(row));
            return jsonCategory;
        }
        else if(state_id == '0')
        {
            console.log('Desestimado');
            const [row] = await db.query(`UPDATE Denuncia SET Estado = 'Desestimado' WHERE id = ?`, [complaint_id]);
            let jsonCategory = JSON.parse(JSON.stringify(row));
            return jsonCategory;
        }
    }
}