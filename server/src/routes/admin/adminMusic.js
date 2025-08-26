// routes/news.js
import express from 'express';
import AdminMusicController from '../../controllers/admin/AdminMusicController.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { requireRole } from '../../middleware/requireRole.js';
import { uploadAudio } from '../../middleware/upload.js';

const router = express.Router();

//AuthController
router.get(`/search/tracks`, authenticateJWT, requireRole('admin'), AdminMusicController.searchTrack);
router.put(
    '/add/track/audio/:id',
    authenticateJWT,
    requireRole('admin'),
    uploadAudio('audio'),
    AdminMusicController.addTrackAudio,
);
router.post('/add/track/:id', authenticateJWT, requireRole('admin'), AdminMusicController.addTrack);
router.get('/tracks/all', authenticateJWT, requireRole('admin'), AdminMusicController.getAllTracks);
router.delete('/delete/:id', authenticateJWT, requireRole('admin'), AdminMusicController.removeTrack);

export default router;
