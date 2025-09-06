import express from 'express';
import songRouter from './songRoutes.js';
import listeningHistoryRoutes from './listeningHistoryRoutes.js';
import playlistRoutes from './playlistRoutes.js';
import searchRouter from './searchRouter.js';
const router = express.Router();

router.use('/tracks', songRouter);
router.use('/listening-history', listeningHistoryRoutes);
router.use('/playlists', playlistRoutes);
router.use('/search', searchRouter);
export default router;
