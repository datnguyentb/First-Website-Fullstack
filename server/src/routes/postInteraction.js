import express from 'express';
import PostInteractionController from '../controllers/user/PostInteractionController.js';
import { authenticateJWT, requireRole, checkPostAccess } from '../middleware/index.js';

const router = express.Router();

// Tương tác với bài viết

router.put('/save/:postId', authenticateJWT, requireRole('user'), PostInteractionController.savePost);
router.put('/unsave/:postId', authenticateJWT, requireRole('user'), PostInteractionController.unsavePost);
router.put('/hide/:postId', authenticateJWT, requireRole('user'), PostInteractionController.hidePost);
router.put('/report/:postId', authenticateJWT, requireRole('user'), PostInteractionController.reportPost);

export default router;
