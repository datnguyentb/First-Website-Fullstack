// routes/news.js
import express from 'express';
import musicPlayerController from '../controllers/music/MusicPlayerController.js';

const router = express.Router();

//AuthController
router.get('/tracks/recommend', musicPlayerController.getTracksRecomend);
export default router;
