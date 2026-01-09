import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { BaseService } from "./base.service";
import { ENV } from "../config/env"; 
import {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
} from "../utils/validator";


interface RegisterDto {
  userId?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

export class AuthService extends BaseService<IUser> {
  private userRepo: UserRepository;

  constructor() {
    const repo = new UserRepository();
    super(repo, "User");
    this.userRepo = repo;
  }

  // REGISTER
  async register(data: RegisterDto): Promise<IUser> {

     validateRegister(data);

    const emailExists = await this.checkDuplicate("email", data.email);
    if (emailExists) throw new Error("Email already exists");

    const phoneExists = await this.checkDuplicate("phone", data.phone);
    if (phoneExists) throw new Error("Phone already exists");

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);
    const userId = data.userId || `user_${Date.now()}`;

    // Create new user
    const newUser = await this.userRepo.create({
      ...data,
      userId,
      passwordHash,
      accountStatus: "active",
    });

    return newUser;
  }

  // LOGIN
  async login(data: LoginDto) {

    validateLogin(data);

    const user = await this.userRepo.findByEmail(data.email);
    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      ENV.jwtSecret,
      { expiresIn: "1h" }
    );
    return { user, token };
  }

  // FORGOT PASSWORD
  async forgotPassword(email: string): Promise<{ message: string; resetToken: string }> {

    validateForgotPassword(email);

    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("User not found");

    const resetToken = jwt.sign(
      { userId: user.userId },
      ENV.jwtSecret, 
      { expiresIn: "15m" }
    );
    return { message: "Password reset email sent", resetToken };
  }

  //RESET PASSWORD
  async resetPassword(token: string, newPassword: string): Promise<IUser | null> {
    
     validateResetPassword({ token, newPassword });

    const decoded: any = jwt.verify(token, ENV.jwtSecret);
    const passwordHash = await bcrypt.hash(newPassword, 10);
    const updatedUser = await this.userRepo.updatePassword(decoded.userId, passwordHash);
    return updatedUser;
  }
}
