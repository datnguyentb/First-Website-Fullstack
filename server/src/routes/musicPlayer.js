import express from 'express';
import musicPlayerController from '../controllers/music/MusicPlayerController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router();

//AuthController
router.get('/tracks/recommend', authenticateJWT, requireRole('user'), musicPlayerController.getTracksRecomend);
router.get('/listening-history', authenticateJWT, requireRole('user'), musicPlayerController.getListeningHistory);
router.post(
    '/listening-history/:trackId',
    authenticateJWT,
    requireRole('user'),
    musicPlayerController.addTrackToListeningHistory,
);
router.get('/search/:q', authenticateJWT, requireRole('user'), musicPlayerController.searchTracks);
router.get('/track/url/:trackId', authenticateJWT, requireRole('user'), musicPlayerController.getTrackUrlById);
export default router;
// authenticateJWT, requireRole('user'),
