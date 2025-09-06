import express from 'express';
import listeningHistoryController from '../../controllers/music/listeningHistoryController.js';
import { requireRole, authenticateJWT } from '../../middleware/index.js';

const router = express.Router();

//AuthController
router.get('/', authenticateJWT, requireRole('user'), listeningHistoryController.getListeningHistory);
router.post('/:trackId', authenticateJWT, requireRole('user'), listeningHistoryController.addTrackToListeningHistory);
export default router;
