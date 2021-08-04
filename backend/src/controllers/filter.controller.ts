import { Handler } from 'express';
import Filter from '../models/Filter';
import { FilterService } from '../services/filter.services';

export class FilterController
{
    /**
     * Método encargado de obtener la lista de los municipios.
     * @returns status 200 y un arreglo de tamaño 20 con la información de los usuarios.
     * @returns status 401 si el usuario que realiza la petición no es un administrador.
     * @param req Objeto de tipo Request
     * @param res Objeto de tipo Response
     */
    public static getMunicipality: Handler = async (req, res) =>
    {
        try
        {
            const filter = await FilterService.municipalityFilter(req.params.id);
            res.status(200).send({municipalities: filter});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }

    /**
     * Método encargado de obtener la lista de los departamentos.
     * @returns status 200 y un arreglo de tamaño 20 con la información de los usuarios.
     * @returns status 401 si el usuario que realiza la petición no es un administrador.
     * @param req Objeto de tipo Request
     * @param res Objeto de tipo Response
     */
    public static getDepartment: Handler = async (req,res) =>
    {
        try
        {
            const filter = await FilterService.departmentFilter();
            res.status(200).send({departments: filter});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }

    public static getFilteredProducts : Handler = async (req, res) => {
        const filterInfo : Filter = req.body;
        let {query, queryParams} = await FilterService.getQuery(filterInfo);
        let test = await FilterService.test(query, queryParams);
        res.status(200).send({message: test});
    }

}