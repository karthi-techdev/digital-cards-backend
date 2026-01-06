import { IAdmin } from "src/models/admin.model";
import { BaseService } from "./base.service";
import {AdminRepository} from '../repositories/admin.repository';
import { generateToken ,comparePassword} from "../utils/auth";
export class AdminService extends BaseService<IAdmin>{
    private static instance:AdminService;
    private adminRepository:AdminRepository;
    private constructor(){
        const repository=new AdminRepository();
        super(repository,'ADMIN');
        this.adminRepository=repository;
    }
    static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }
  async login(data:Partial<IAdmin>){
    if(data.email){
      const admin=await this.adminRepository.getAdminByEmail(data.email);
    if(admin){
        const isValid=await comparePassword(data.password as string,admin.password);
        if(isValid){
          const token=generateToken({id:admin._id as string,role:admin.role,email:admin.email});
          return {admin,token};
        }
        else{
          throw new Error('Invalid Password')
        }
    }
    else{
      throw new Error("Email not found")
    }
    }
  }
}