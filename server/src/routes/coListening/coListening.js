// routes/news.js
import express from 'express';
import { authenticateJWT, requireRole } from '../../middleware/index.js';
import CoListeningController from '../../controllers/coListening/CoListeningController.js';

const router = express.Router();

//AuthController
router.post('/room/create', authenticateJWT, requireRole('user'), CoListeningController.create);

export default router;
