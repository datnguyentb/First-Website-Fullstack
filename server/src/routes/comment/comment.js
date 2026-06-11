// routes/news.js
import express from 'express';
import { authenticateJWT, requireRole } from '../../middleware/index.js';
import PostCommentController from '../../controllers/post/PostCommentController.js';

const router = express.Router();

router.post('/add', authenticateJWT, requireRole('user'), PostCommentController.create);

export default router;
