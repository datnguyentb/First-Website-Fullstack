import express from 'express';
import songRouter from './songRoutes.js';
import listeningHistoryRoutes from './listeningHistoryRoutes.js';
import playlistRoutes from './playlistRoutes.js';
import searchRouter from './searchRouter.js';
import spotifyRouter from './spotify.js';
const router = express.Router();

router.use('/tracks', songRouter);
router.use('/listening-history', listeningHistoryRoutes);
router.use('/playlists', playlistRoutes);
router.use('/search', searchRouter);
router.use('/spotify', spotifyRouter);
export default router;
