import { model,Document,Schema } from "mongoose";

export interface IAdmin extends Document{
    name:string;
    email:string;
    password:string;
    role:'super_admin'|'staff_admin';
    createdAt:Date;
    updatedAt:Date;
}
const adminSchema=new Schema<IAdmin>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:['super_admin','staff_admin']},
},
    {timestamps:true}
)
export const AdminModel=model<IAdmin>('Admin',adminSchema);