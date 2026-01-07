import { Request, Response } from "express";
import { AdminService } from '../services/admin.services';
export class AdminController {
    private static adminService = AdminService.getInstance();
    static async login(req: Request, res: Response) {
        try {
            const data = await AdminController.adminService.login(req.body);
            res.status(201).json({ success: true, data: data?.admin, token: data?.token });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
    static async getUsers(req: Request, res: Response) {
        try {
            const page = Number.parseInt(req.query.page as string) || 1;
            const limit = Number.parseInt(req.query.limit as string) || 10;
            const { users, total } = await AdminController.adminService.getAllUsers(page, limit);
            res.status(200).json({
                success: true,
                data: users,
                meta: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
    static async getUser(req: Request, res: Response) {
       try {
         const user=await AdminController.adminService.getUserById(req.params.id);
        res.status(200).json({success:true,data:user})
       } catch (error) {
         if (error instanceof Error && error.message === 'User not found') {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
       }
    }
    static async blockUser(req:Request,res:Response){
        try {
            const accountStatus='block';
            const user=await AdminController.adminService.updateUser(req.params.id,accountStatus);
            res.status(200).json({success:true,data:user,message:"User blocked successfully"});
        } catch (error) {
            if (error instanceof Error && error.message === 'User not found') {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message:'Internal server error' });
      }
        }
    }
    static async unblockUser(req:Request,res:Response){
        try {
            const accountStatus='active';
            const user=await AdminController.adminService.updateUser(req.params.id,accountStatus);
            res.status(200).json({success:true,data:user,message:"User unblocked successfully"});
        } catch (error) {
            if (error instanceof Error && error.message === 'User not found') {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
        }
    }
    static async deleteUser(req:Request,res:Response){
        try {
            const user=await AdminController.adminService.deleteUser(req.params.id);
            if(user)
            res.status(200).json({success:true,message:"User deleted successfully"});
        else{
            res.status(404).json({ success: false, message:'User not found'});
        }
        } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}