import { db } from "../config/database";

export class FilterService
{
    /**
     * Método encargado de obtener la lista filtrada de los municipios dependiendo del departamento que seleccione.
     * @param id El municipio que el usuario desea ver.
     */
    public static municipalityFilter = async (id: string) =>
    {
        const [row, fields] = await db.query('SELECT Municipio.Nombre, Municipio.id FROM Municipio JOIN Departamento ON Municipio.fk_id_departamento = Departamento.id WHERE Municipio.fk_id_departamento = ?', [id]);
        let jsonMunicipality = JSON.parse(JSON.stringify(row));
        return jsonMunicipality;      
    }

    /**
     * Método encargado de obtener la lista de todos los departamentos en la base de datos.
     */
    public static departmentFilter = async () =>
    {
        const [row, fields] = await db.query('SELECT * FROM Departamento');
        let jsonDepartment = JSON.parse(JSON.stringify(row));
        return jsonDepartment;
    }
}