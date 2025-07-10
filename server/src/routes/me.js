// routes/news.js
import express from 'express';
import MeController from '../app/controllers/meController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

//AuthController
router.get('/me', authenticateJWT, MeController.getCurrentUser);

export default router;
