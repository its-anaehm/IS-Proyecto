import { db } from "../config/database";
import Filter from "../models/Filter";

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

    public static getQuery = async (filterInfo: Filter) => {
        var query = "";
        const queryParams = [];

        if(filterInfo.Department !== undefined){
            query = "WHERE Departamento.id = ?";
            queryParams.push(filterInfo.Department)
        }
        if(filterInfo.Municipality !== undefined && query !== ""){
            query += " AND Municipio.id = ?";
            queryParams.push(filterInfo.Municipality)
        }else if(filterInfo.Municipality !== undefined){
             query = "WHERE Municipio.id = ?";
             queryParams.push(filterInfo.Municipality)
        }
        if(filterInfo.Category !== undefined && query !== ""){
            query += " AND Categoria.id = ?";
            queryParams.push(filterInfo.Category)
        }else if(filterInfo.Category !== undefined){
            query = "WHERE Categoria.id = ?";
            queryParams.push(filterInfo.Category)
        }
        if(filterInfo.minPrice !== undefined && query !== ""){
            query = " AND Producto.Precio >= ?";
            queryParams.push(filterInfo.minPrice)
        }else if(filterInfo.minPrice !== undefined){
            query += " WHERE Producto.Precio >= ?";
            queryParams.push(filterInfo.minPrice)
        }
        if(filterInfo.maxPrice !== undefined && query !== ""){
            query = " AND Producto.Precio <= ?";
            queryParams.push(filterInfo.maxPrice)
        }else if(filterInfo.maxPrice !== undefined){
            query += "WHERE Producto.Precio <= ?";
            queryParams.push(filterInfo.maxPrice)
        }
        if(filterInfo.order !== undefined){
            query += " ORDER BY Producto.Precio ?";
            queryParams.push(filterInfo.order)
        }
        console.log(query);
        return [query, queryParams];
    }
}