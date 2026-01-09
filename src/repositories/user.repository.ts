import { UserModel, IUser } from "../models/user.model";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel, "userId"); 
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(userData);
    return user.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  async findByPhone(phone: string): Promise<IUser | null> {
    return UserModel.findOne({ phone });
  }

  async updatePassword(userId: string, newPasswordHash: string): Promise<IUser | null> {
    return UserModel.findOneAndUpdate(
      { userId },
      { passwordHash: newPasswordHash },
      { new: true }
    );
  }
}
