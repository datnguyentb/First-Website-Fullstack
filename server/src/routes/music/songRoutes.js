import express from 'express';
import musicPlayerController from '../controllers/music/MusicPlayerController.js';
import { requireRole, authenticateJWT, uploadPlaylistAvatar } from '../middleware/index.js';

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
router.post(
    '/playlist/create',
    authenticateJWT,
    requireRole('user'),
    uploadPlaylistAvatar('playlistAvatar'),
    musicPlayerController.createPlaylist,
);
router.get('/playlists/me', authenticateJWT, requireRole('user'), musicPlayerController.getUserPlaylists);
export default router;
