import mongoose from "mongoose";
import { AdminModel,IAdmin } from "../models/admin.model";
import { cleanHtml } from "src/utils/sanitizeHtml";
import { BaseRepository } from "./base.repository";
export class AdminRepository extends BaseRepository<IAdmin>{
    constructor(){
        super(AdminModel,'email');
    }
    async getAdminByEmail(email:string):Promise<IAdmin|null>{
        return await AdminModel.findOne({email});
    }
}