// routes/news.js
import express from 'express';
import AdminMusicController from '../../controllers/admin/AdminMusicController.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { requireRole } from '../../middleware/requireRole.js';

const router = express.Router();

//AuthController
router.get('/search', authenticateJWT, requireRole('admin'), AdminMusicController.searchTracksAndPlaylist);

export default router;
