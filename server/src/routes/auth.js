// routes/news.js
import express from 'express';
import authController from '../app/controllers/AuthController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

//AuthController
router.get('/check-token', authenticateJWT, authController.checkToken);
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
