import { db } from '../config/database';

export default class QualificationService{

    public static addQualification = async(qualificator : Number, qualified: string, qualification: string) => {
        const [row] = await db.query("INSERT INTO Calificacion(fk_id_calificador, fk_id_calificado, calificacion) VALUES(?,?,?)", 
                                [qualificator, qualified, qualification]);   
        return JSON.parse(JSON.stringify(row));
    }

    public static getUserQuallification = async (user_id: string) => {{
        const [ row ] = await db.query(
            "SELECT fk_id_calificado AS qualified, COUNT(fk_id_calificado) AS Numero Calificaciones, AVG(calificacion) FROM Calificacion WHERE fk_id_calificado = ? GROUP BY fk_id_calificado", 
            [ user_id ])

        return JSON.parse(JSON.stringify(row))[0];
    }}

}