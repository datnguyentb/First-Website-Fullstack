import express from 'express';
import AdminPostController from '../../controllers/admin/AdminPostController.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { requireRole } from '../../middleware/requireRole.js';

const router = express.Router();

//AuthController
router.get('/get_posts_number', authenticateJWT, requireRole('admin'), AdminPostController.getPostsNumber);
router.get('/get_all_posts', authenticateJWT, requireRole('admin'), AdminPostController.getAllPost);
router.delete('/delete/:id', authenticateJWT, requireRole('admin'), AdminPostController.softDelete);
router.patch('/restore/:id', authenticateJWT, requireRole('admin'), AdminPostController.restorePost);
router.delete('/force/:id', authenticateJWT, requireRole('admin'), AdminPostController.forceDeletePost);

export default router;
