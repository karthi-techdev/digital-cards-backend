import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  userId: string; 
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  accountStatus: "active" | "pending" | "blocked";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
   
    userId: {type: String, required: true, unique: true, trim: true},
    name: { type: String, required: true, trim: true},
    email: { type: String,required: true,unique: true,lowercase: true, trim: true},
    phone: { type: String, required: true, unique: true, trim: true},
    passwordHash: { type: String, required: true },
     accountStatus: {
      type: String,
      enum: ["active", "pending", "blocked"], 
      default: "pending", 
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUser>("User", userSchema);

