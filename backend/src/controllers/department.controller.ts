import { Handler } from 'express';
import DepartmentService from '../services/department.service';


export default class DepartmentController{

    public static getDepartmentList : Handler = async (req, res)  => {
        if(req.user.role !== 'guest'){
            const departments = await DepartmentService.getDepartmentList()
            return res.status(200).send({departments: departments})
        }
        res.status(400).send({message:'Invalid user'})
    }
    
    public static getDepartmentMunicipies : Handler = async (req, res) => {
        if(req.user.role !== 'guest'){
            const municipies = await DepartmentService.getMunicipies(req.params.id)
            return res.status(200).send({municipies: municipies})
        }
        res.status(400).send({message:'Invalid user'})
    }

}