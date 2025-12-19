import express from 'express';
import ConversationController from '../../controllers/chat/conversationController.js';
import { authenticateJWT, requireRole } from '../../middleware/index.js';

const router = express.Router();

//ConversationController
router.post('/', authenticateJWT, requireRole('user'), ConversationController.getOrCreateConversation);
router.get('/', authenticateJWT, requireRole('user'), ConversationController.getAllConversations);
router.get('/:conversationId', authenticateJWT, requireRole('user'), ConversationController.getConversationDetail);

export default router;
