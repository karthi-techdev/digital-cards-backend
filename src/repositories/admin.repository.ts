import mongoose from "mongoose";
import { AdminModel,IAdmin } from "../models/admin.model";
import { UserModel,IUser } from "../models/user.model";
import { cleanHtml } from "../utils/sanitizeHtml";
import { BaseRepository } from "./base.repository";
import { UserRepository } from "./user.repository";
export class AdminRepository extends BaseRepository<IAdmin>{
    private userRepository:UserRepository;
    constructor(){
        super(AdminModel,'email');
         this.userRepository = new UserRepository();
    }
    async getAdminByEmail(email:string):Promise<IAdmin|null>{
        const sanitizedAnswer=email?cleanHtml(email):'';
        return await AdminModel.findOne({email:sanitizedAnswer});
    }
    async getAllUser(page?: number, limit?: number, filter: Record<string, any> = {}){
        const result=await this.userRepository.getPaginated(page,limit,filter);
        return {
      users: result.data,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages
    };
    }
    async getUserById(id:string):Promise<IUser|null>{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return null;
        }
        return await UserModel.findById(id);
    }
    async updateUser(id:string,accountStatus:string):Promise<IUser|null>{
         if(!mongoose.Types.ObjectId.isValid(id)){
            return null;
        }
        return await UserModel.findByIdAndUpdate(id,{accountStatus},{new:true});
    }
    async deleteUser(id:string):Promise<IUser|null>{
         if(!mongoose.Types.ObjectId.isValid(id)){
            return null;
        }
        return await UserModel.findByIdAndDelete(id);
    }
}