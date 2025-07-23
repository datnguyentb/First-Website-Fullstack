import express from 'express';
import AdminPostController from '../../controllers/admin/AdminPostController.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { requireRole } from '../../middleware/requireRole.js';

const router = express.Router();

//AuthController
router.get('/get_posts_number', authenticateJWT, requireRole('admin'), AdminPostController.getPostsNumber);
router.get('/get_all_posts', authenticateJWT, requireRole('admin'), AdminPostController.getAllPost);

export default router;
