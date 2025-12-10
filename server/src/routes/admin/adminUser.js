import express from 'express';
import AdminUserController from '../../controllers/admin/AdminUserController.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { requireRole } from '../../middleware/requireRole.js';

const router = express.Router();

//AuthController
router.get('/get_user_number', authenticateJWT, requireRole('admin'), AdminUserController.getUserNumber);
router.get('/get_all_users', authenticateJWT, requireRole('admin'), AdminUserController.getAllUsers);

export default router;
