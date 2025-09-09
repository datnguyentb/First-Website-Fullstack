import express from 'express';
import songController from '../../controllers/music/songController.js';
import { requireRole, authenticateJWT } from '../../middleware/index.js';

const router = express.Router();

router.get('/recommend', authenticateJWT, requireRole('user'), songController.getTracksRecommend);
router.get('/url/:trackId', authenticateJWT, requireRole('user'), songController.getTrackUrlById);

export default router;
