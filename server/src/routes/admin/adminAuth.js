// routes/news.js
import express from 'express';
import AdminAuthController from '../../controllers/admin/AdminAuthController.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { requireRole } from '../../middleware/requireRole.js';

const router = express.Router();

//AuthController
router.get('/check-token', authenticateJWT, requireRole('admin'), AdminAuthController.checkToken);
router.post('/login', AdminAuthController.login);
router.get('/check-token', authenticateJWT, requireRole('admin'), AdminAuthController.checkToken);

export default router;
