import express from 'express';
import { getAllUsers, deleteUser, updateUserRole } from '../controllers/userController.js';
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.get('/', auth, authorize('admin'), getAllUsers);
router.delete('/:id', auth, authorize('admin'), deleteUser);
router.put('/:id/role', auth, authorize('admin'), updateUserRole);

export default router;
