// routes/news.js
import express from 'express';
import spotifyController from '../controllers/music/spotifyController.js';

const router = express.Router();

//AuthController
router.get('/track/:id', spotifyController.getTrackInfo);
router.get('/tracks/:listId', spotifyController.getSeveralTracks);
router.get('/search', spotifyController.searchSpotify);
router.get('/album/:id', spotifyController.getAlbumInfo);
router.get('/artist/:id', spotifyController.getArtistInfo);
export default router;
