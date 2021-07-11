import { db } from "../config/database";

export class FilterService
{
    /**
     * Método encargado de obtener la lista filtrada de los municipios dependiendo del departamento que seleccione.
     * @param id El municipio que el usuario desea ver.
     */
    public static municipalityFilter = async (id: number) =>
    {
        const [row, fields] = await db.query('SELECT municipio.Nombre, municipio.id FROM municipio JOIN departamento ON municipio.fk_id_departamento = departamento.id WHERE municipio.fk_id_departamento = ?', [id]);
        let jsonMunicipality = JSON.parse(JSON.stringify(row));
        return jsonMunicipality;      
    }

    /**
     * Método encargado de obtener la lista de todos los departamentos en la base de datos.
     */
    public static departmentFilter = async () =>
    {
        const [row, fields] = await db.query('SELECT * FROM departamento');
        let jsonDepartment = JSON.parse(JSON.stringify(row));
        return jsonDepartment;
    }
}