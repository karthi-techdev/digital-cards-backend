import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ENV } from '../config/env';
 export const generateToken=(payload:object)=>{
    const token=jwt.sign(payload,ENV.jwtSecretKey!,{expiresIn:ENV.jwtAccessExpiration});
    return token;
 }
export const comparePassword=async(enteredPassword:string,password:string)=>{
    return await bcrypt.compare(enteredPassword,password);
}