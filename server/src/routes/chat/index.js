import express from 'express';
import messageRouter from './messageRoutes.js';
import ConversationRouter from './conversationRoutes.js';
const router = express.Router();

router.use('/message', messageRouter);
router.use('/conversations', ConversationRouter);
export default router;
