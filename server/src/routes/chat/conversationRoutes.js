import express from 'express';
import ConversationController from '../../controllers/chat/conversationController.js';
import { authenticateJWT, requireRole } from '../../middleware/index.js';

const router = express.Router();

//ConversationController
router.post('/', authenticateJWT, requireRole('user'), ConversationController.getOrCreateConversation);

export default router;
