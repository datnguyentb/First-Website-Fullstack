import express from 'express';
import MessageController from '../../controllers/chat/messageController.js';
import { authenticateJWT, requireRole } from '../../middleware/index.js';

const router = express.Router();

//AuthController
router.get('/get/:conversationId', authenticateJWT, requireRole('user'), MessageController.getMessages);

export default router;
