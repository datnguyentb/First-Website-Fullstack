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
router.delete('/delete/:id', authenticateJWT, requireRole('user'), playlistController.deletePlaylist);
router.get('/me', authenticateJWT, requireRole('user'), playlistController.getUserPlaylists);
router.post('/favorite/add/:id', authenticateJWT, requireRole('user'), playlistController.addTrackToFavorite);
router.delete('/favorite/remove/:id', authenticateJWT, requireRole('user'), playlistController.removeTrackFromFavorite);
router.get('/favorite/all', authenticateJWT, requireRole('user'), playlistController.getFavoritePlaylistIds);
router.get('/:id', authenticateJWT, requireRole('user'), playlistController.getPlaylistById);
router.patch('/add/:id/songs', authenticateJWT, requireRole('user'), playlistController.addTrackToPlaylist);
router.delete('/delete/:id/songs', authenticateJWT, requireRole('user'), playlistController.removeTrackFromPlaylist);

export default router;
