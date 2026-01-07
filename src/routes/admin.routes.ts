import { Router } from "express";
import {AdminController} from '../controllers/admin.controller';

const router=Router();

router.post('/login',AdminController.login);
router.get('/users',AdminController.getUsers);
router.get('/users/:id',AdminController.getUser);
router.patch('/users/:id/block',AdminController.blockUser);
router.patch('/users/:id/unblock',AdminController.unblockUser);
router.delete('/users/:id',AdminController.deleteUser);
export default router;