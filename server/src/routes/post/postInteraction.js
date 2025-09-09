import express from 'express';
import PostInteractionController from '../../controllers/post/PostInteractionController.js';
import { authenticateJWT, requireRole, checkPostAccess } from '../../middleware/index.js';

const router = express.Router();

// Tương tác với bài viết

router.patch(
    '/like/:postId',
    authenticateJWT,
    requireRole('user'),
    checkPostAccess,
    PostInteractionController.likePost,
);
checkPostAccess,
    router.put(
        '/save/:postId',
        authenticateJWT,
        requireRole('user'),
        checkPostAccess,
        PostInteractionController.savePost,
    );
router.put(
    '/unsave/:postId',
    authenticateJWT,
    requireRole('user'),
    checkPostAccess,
    PostInteractionController.unsavePost,
);
router.put('/hide/:postId', authenticateJWT, requireRole('user'), checkPostAccess, PostInteractionController.hidePost);
router.put(
    '/report/:postId',
    authenticateJWT,
    requireRole('user'),
    checkPostAccess,
    PostInteractionController.reportPost,
);

export default router;
