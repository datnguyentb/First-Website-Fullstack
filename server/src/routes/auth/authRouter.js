// routes/news.js
import express from 'express';
import authController from '../../controllers/user/AuthController.js';
import { authenticateJWT, requireRole } from '../../middleware/index.js';

const router = express.Router();

//AuthController
router.get('/check-token', authenticateJWT, requireRole('user'), authController.checkToken);
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
