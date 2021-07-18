import { db } from "../config/database";

export default class DepartmentService{

    public static getDepartment = async ( id: Number | string) => {
        let [row] = await db.query("SELECT Nombre FROM Departamento WHERE Departamento.id = ?", [id])
        return JSON.parse(JSON.stringify(row))[0]["Nombre"]
    }

    public static getDepartmentList = async () => {
        let [row] = await db.query('SELECT * FROM Departamento');
        return JSON.parse(JSON.stringify(row))
    }

    public static getMunicipies = async (id: string) => {
        let [row] = await db.query('SELECT * FROM Municipio WHERE fk_id_departamento = ?', [id]);
        return JSON.parse(JSON.stringify(row))
    }

}