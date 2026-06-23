// routes/news.js
import express from 'express';
import { authenticateJWT, requireRole, uploadPostImage } from '../../middleware/index.js';
import BannerController from '../../controllers/banner/BannerController.js';
import { uploadBannerImage } from '../../middleware/upload.js';

const router = express.Router();

//get Banner router
router.get('/home', authenticateJWT, requireRole('user'), BannerController.getHomeBanners);
router.get('/auth', BannerController.getAuthBanners);

export default router;
