import { Request, Response } from "express";
import { AuthService } from "../services/user.service";

const authService = new AuthService();

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ success: true, user });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const data = await authService.login(req.body);
    res.status(200).json({ success: true, ...data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const data = await authService.forgotPassword(email);
    res.status(200).json({ success: true, ...data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// RESET PASSWORD
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const user = await authService.resetPassword(token, newPassword);
    res.status(200).json({ success: true, user });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
