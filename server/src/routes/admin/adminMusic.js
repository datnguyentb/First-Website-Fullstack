// routes/news.js
import express from 'express';
import AdminMusicController from '../../controllers/admin/AdminMusicController.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { requireRole } from '../../middleware/requireRole.js';

const router = express.Router();

//AuthController
router.get('/search', authenticateJWT, requireRole('admin'), AdminMusicController.searchTracksAndPlaylist);
router.post('/add', authenticateJWT, requireRole('admin'), AdminMusicController.addTrack);
router.get('/all', authenticateJWT, requireRole('admin'), AdminMusicController.getTracksAndPlaylist);
router.delete('/delete/:spotifyId', authenticateJWT, requireRole('admin'), AdminMusicController.removeTrackAndPlaylist);

export default router;
