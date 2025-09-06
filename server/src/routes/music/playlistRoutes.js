import express from 'express';
import playlistController from '../../controllers/music/playlistController.js';
import { requireRole, authenticateJWT, uploadPlaylistAvatar } from '../../middleware/index.js';

const router = express.Router();

router.post(
    '/create',
    authenticateJWT,
    requireRole('user'),
    uploadPlaylistAvatar('playlistAvatar'),
    playlistController.createPlaylist,
);
router.get('/me', authenticateJWT, requireRole('user'), playlistController.getUserPlaylists);
export default router;
