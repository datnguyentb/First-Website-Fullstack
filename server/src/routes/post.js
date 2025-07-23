// routes/news.js
import express from 'express';
import postController from '../controllers/PostController.js';
import { authenticateJWT, requireRole, uploadPostImage } from '../middleware/index.js';

const router = express.Router();

//AuthController
router.post('/create', authenticateJWT, requireRole('user'), uploadPostImage('posts'), postController.create);
router.patch('/post/like/:id', authenticateJWT, requireRole('user'), postController.likePost);
router.delete('/delete/:id', authenticateJWT, requireRole('user'), postController.deletePost);
router.get('/get_all', authenticateJWT, requireRole('user'), postController.getAll);

export default router;
