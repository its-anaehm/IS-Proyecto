import { db } from "../config/database";
import Filter from "../models/Filter";
import Product from "../models/Product";
import ProductService from "./product.service";

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
        var query: string = "";
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
            query += " AND Producto.Precio >= ?";
            queryParams.push(filterInfo.minPrice)
        }else if(filterInfo.minPrice !== undefined){
            query = " WHERE Producto.Precio >= ?";
            queryParams.push(filterInfo.minPrice)
        }
        if(filterInfo.maxPrice !== undefined && query !== ""){
            query += " AND Producto.Precio <= ?";
            queryParams.push(filterInfo.maxPrice)
        }else if(filterInfo.maxPrice !== undefined){
            query = "WHERE Producto.Precio <= ?";
            queryParams.push(filterInfo.maxPrice)
        }
        if(filterInfo.order !== undefined){
            query += ` ORDER BY Producto.Precio ${filterInfo.order}`;
        }
        //console.log(query);
        return { query, queryParams } 
    }
    public static test = async(query: string, queryParams: string[]) =>
    {
        const [row, fields] = await db.query(`SELECT Producto.id AS 'id', CONCAT(Usuario.Nombre,' ',Usuario.Apellido) AS 'owner', Producto.Nombre AS 'name', Producto.Precio AS 'price', Producto.Descripcion AS 'details', DATE_FORMAT(Producto.Fecha_Publicacion, '%y-%m-%d') AS 'date', Categoria.id AS 'category', Departamento.Nombre AS 'department', Municipio.Nombre AS 'municipy' FROM Producto JOIN Categoria ON Producto.fk_id_categoria = Categoria.id JOIN Municipio ON Producto.fk_id_municipio = Municipio.id JOIN Departamento ON Producto.fk_id_departamento = Departamento.id JOIN Usuario ON Producto.fk_id_usuario = Usuario.id ${query}`, queryParams);
        let jsonFilter: Array<Product> = JSON.parse(JSON.stringify(row));
        jsonFilter = await ProductService.getAllProductsImages(jsonFilter);
        return jsonFilter;
    }
}