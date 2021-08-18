import { Handler } from 'express';
import { ComplaintsService } from '../services/complaints.service';

export class ComplaintController
{
    public static makeComplaint: Handler = async(req,res) =>
    {
        try
        {
            if(req.params.acusserid == req.params.acussedid)
            {
                res.status(400).send({message: 'No te puedes denunciar a ti mismo.'});
            }
            else
            {
                const complaint = await ComplaintsService.makeComplaint(req.params.acusserid,req.params.acussedid,req.params.complainttype);
                res.status(200).send({message: 'Done'});
            }
        }
        catch(err)
        {
            console.log(req.params.acusser,req.params.acussed,req.params.type)
            res.status(400).send({message: err});
        }
    }
    public static listComplaint: Handler = async(req,res) =>
    {
        try
        {
            const listComplaint = await ComplaintsService.listComplaints();
            res.status(200).send({message: listComplaint});
        }
        catch(err)
        {
            console.log(err);
            res.status(400).send({message: err});
        }
    }
    public static listComplaintLimit: Handler = async(req,res) =>
    {
        try
        {
            const listComplaintLimit = await ComplaintsService.listComplaintsLimit();
            res.status(200).send({message: listComplaintLimit});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }
    public static getComplaintSpecific: Handler = async(req,res) =>
    {
        try
        {
            const listComplaintLimit = await ComplaintsService.getSpecificComplaint(Number(req.params.id));
            res.status(200).send({message: listComplaintLimit});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }
    public static verifyComplaint: Handler = async(req,res) =>
    {
        try
        {
            const verifyComplaint = await ComplaintsService.verifyComplaint(req.params.state,req.params.id);
            res.status(200).send({message: 'Done'});
        }
        catch(err)
        {
            res.status(400).send({message: err});
        }
    }
}