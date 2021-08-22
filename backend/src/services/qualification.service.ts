import { db } from '../config/database';
import Qualification from '../models/Qualification';

export default class QualificationService{

    public static addQualification = async(qualificator : Number, qualificationInfo : Qualification) => {
        const [row] = await db.query("INSERT INTO Calificacion(fk_id_calificador, fk_id_calificado, calificacion, comentario) VALUES(?,?,?,?)", 
                                [qualificator, qualificationInfo.qualifiedUser, qualificationInfo.qualification, qualificationInfo.comment ]);   
        return JSON.parse(JSON.stringify(row));
    }

    public static getUserQuallification = async (user_id: string) => {
        const [ row ] = await db.query(
            "SELECT fk_id_calificado AS qualifiedUserId, COUNT(fk_id_calificado) AS num_qualifications, AVG(calificacion) AS qualification FROM Calificacion WHERE fk_id_calificado = ? GROUP BY fk_id_calificado", 
            [ user_id ])

        return JSON.parse(JSON.stringify(row))[0];
    }

    public static getQualificationComments = async (user_id: string) => {
        const [ row ] = await db.query(
            "SELECT comentario AS comment FROM Calificacion WHERE fk_id_calificado = ? ORDER BY fecha_comentario DESC LIMIT 3", 
            [ user_id ])

        return JSON.parse(JSON.stringify(row));
    }

    public static updateQualification = async(qualificator : Number, qualificationInfo : Qualification) => {
        const [row] = await db.query("UPDATE Calificacion SET calificacion = ?, comentario = ? WHERE fk_id_calificador = ? AND fk_id_calificado = ?", 
                                [qualificationInfo.qualification, qualificationInfo.comment, qualificator, qualificationInfo.qualifiedUser]);   
        return JSON.parse(JSON.stringify(row));
    }

    public static existsQualification = async(qualificator: Number, qualified: string) => {
        const [ row ] = await db.query(
            "SELECT * FROM Calificacion WHERE fk_id_calificador = ? AND fk_id_calificado = ?", 
            [qualificator, qualified]);
            
        if(JSON.parse(JSON.stringify(row)).length > 0){
            return true;
        }
        return false;
    }

}