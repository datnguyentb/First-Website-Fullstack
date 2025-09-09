// routes/news.js
import express from 'express';
import FriendshipController from '../../controllers/friendship/FriendshipController.js';
import { authenticateJWT, requireRole } from '../../middleware/index.js';

const router = express.Router();

//AuthController
router.post('/request/:id', authenticateJWT, requireRole('user'), FriendshipController.sendFriendRequest);
router.delete('/unfollow/:id', authenticateJWT, requireRole('user'), FriendshipController.unfollowUser);
router.get('/status/:id', authenticateJWT, requireRole('user'), FriendshipController.getFriendshipStatus);

export default router;
