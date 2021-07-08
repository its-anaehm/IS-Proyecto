import { db } from "../config/database";

export class FilterService
{
    public static municipalityFilter = async (id: number) =>
    {
        const [row, fields] = await db.query('SELECT municipio.Nombre, municipio.id FROM municipio JOIN departamento ON municipio.fk_id_departamento = departamento.id WHERE municipio.fk_id_departamento = ?', [id]);
        let jsonMunicipality = JSON.parse(JSON.stringify(row));
        return jsonMunicipality;      
    }

    public static departmentFilter = async () =>
    {
        const [row, fields] = await db.query('SELECT * FROM departamento');
        let jsonDepartment = JSON.parse(JSON.stringify(row));
        return jsonDepartment;
    }
}