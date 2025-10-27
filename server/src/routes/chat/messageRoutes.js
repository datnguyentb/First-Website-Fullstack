import express from 'express';
import MessageController from '../../controllers/chat/messageController.js';
import { authenticateJWT, requireRole } from '../../middleware/index.js';

const router = express.Router();

//AuthController
router.post('/send/:conversationId', authenticateJWT, requireRole('user'), MessageController.saveMessage);

export default router;
