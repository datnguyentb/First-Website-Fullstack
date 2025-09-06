import express from 'express';
import { searchController } from '../../controllers/music/index.js';
import { requireRole, authenticateJWT } from '../../middleware/index.js';

const router = express.Router();

router.get('/:q', authenticateJWT, requireRole('user'), searchController.searchTracks);
export default router;
