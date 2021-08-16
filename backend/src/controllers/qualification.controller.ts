import { Handler } from 'express';
import QualificationService from '../services/qualification.service';
import Calification from '../models/Qualification';

export default class QualificationController{

    public static addQualification : Handler = async (req, res) => {
        const quallificator = req.user.id;
        const qualificationInfo: Calification = req.body;
        if(quallificator !== Number(qualificationInfo.qualifiedUser)){
            const response = QualificationService.addQualification(quallificator, qualificationInfo.qualifiedUser, qualificationInfo.qualification)
            if(response){
                return res.status(200).send({message: "Qualification added"});
            }
        }
        res.status(401).send({message:"Unauthorized user"});
    }

    public static getUserQualification : Handler = async(req, res) => {
        if(req.user.role !== 'guest'){
            const user_id = req.params.id;
            const qualification = await QualificationService.getUserQuallification(user_id);
            return res.status(200).send(qualification);
        }

        res.status(401).send({message: "Unauthorized user"})
    }

}