import mongoose from "mongoose";
import { UserModel,IUser } from "../models/user.model";
import { cleanHtml } from "src/utils/sanitizeHtml";
import { BaseRepository } from "./base.repository";
export class UserRepository extends BaseRepository<IUser>{
    constructor(){
        super(UserModel,'userID');
    }
}