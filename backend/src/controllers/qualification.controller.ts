import { Handler } from 'express';
import QualificationService from '../services/qualification.service';
import Qualification from '../models/Qualification';

export default class QualificationController{

    public static addQualification : Handler = async (req, res) => {
        const qualificator = req.user.id;
        const qualificationInfo: Qualification = req.body;
        
        let existsQualification = await QualificationService.existsQualification(qualificator, qualificationInfo.qualifiedUser)

        if(qualificator !== Number(qualificationInfo.qualifiedUser)){
            if(!existsQualification){
                const qualification = await QualificationService.addQualification(qualificator, qualificationInfo)
                if(qualification){
                    return res.status(200).send({message: "Qualification added"});
                }
            }else{
                const qualification = await QualificationService.updateQualification(qualificator, qualificationInfo)
                if(qualification){
                    return res.status(200).send({message: "Qualification added"});
                }
            }
        }
        res.status(401).send({message:"Unauthorized user"});
    }

    public static getUserQualification : Handler = async(req, res) => {
        if(req.user.role !== 'guest')
        {
            const user_id = req.params.id;
            const qualification = await QualificationService.getUserQuallification(user_id);
            const comments = await QualificationService.getQualificationComments(user_id);

            if(qualification == null || qualification == undefined || qualification == '')
            {
                return res.status(200).send({message: 0});
            }
            else
            {
                return res.status(200).send({qualification, comments});
            }
        }

        res.status(401).send({message: "Unauthorized user"})
    }

}