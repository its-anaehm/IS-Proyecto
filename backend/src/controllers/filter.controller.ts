import { Handler } from 'express';
import { FilterService } from '../services/filter.services';

export class FilterController
{
    public static getMunicipality: Handler = async (req, res) =>
    {
        try
        {
            const filter = await FilterService.municipalityFilter(req.body.id);
            res.status(200).send({municipalities: filter});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }

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
}