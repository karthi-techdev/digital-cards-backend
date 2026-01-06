import { Request,Response } from "express";
import {AdminService} from '../services/admin.services';
export class AdminController{
    private static adminService=AdminService.getInstance();
    static async login(req:Request,res:Response){
        try {
            const data=await AdminController.adminService.login(req.body);
            res.status(201).json({success:true,data:data?.admin,token:data?.token});
        } catch (error) {
            if(error instanceof Error){
                res.status(400).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
        }
    }
}