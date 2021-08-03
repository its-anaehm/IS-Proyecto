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
        let query = "";
        const queryParams = [];

        if(filterInfo.Department !== ""){
            query = "WHERE Departamento.id = ?";
            queryParams.push(filterInfo.Department)
        }
        
        if(filterInfo.Municipality !== "" && query !== ""){
            query += "AND Municipio.id = ?";
            queryParams.push(filterInfo.Municipality)
        }else{
            query = "WHERE Municipio.id = ?";
            queryParams.push(filterInfo.Municipality)
        }

        if(filterInfo.Category !== "" && query !== ""){
            query += "AND Categoria.id = ?";
            queryParams.push(filterInfo.Category)
        }else{
            query = "WHERE Categoria.id = ?";
            queryParams.push(filterInfo.Category)
        }

        if(filterInfo.minPrice !== "" && query !== ""){
            query = "AND Producto.Precio >= ?";
            queryParams.push(filterInfo.minPrice)
        }else{
            query += " WHERE Producto.Precio >= ?";
            queryParams.push(filterInfo.minPrice)
        }

        if(filterInfo.maxPrice !== "" && query !== ""){
            query = "AND Producto.Precio <= ?";
            queryParams.push(filterInfo.maxPrice)
        }else{
            query += "WHERE Producto.Precio <= ?";
            queryParams.push(filterInfo.maxPrice)
        }

        if(filterInfo.order !== ""){
            query += "ORDER BY Producto.Precio ?";
            queryParams.push(filterInfo.order)
        }

        return [query, queryParams];
    }
}