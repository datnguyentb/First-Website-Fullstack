// routes/news.js
import express from 'express';
import { authenticateJWT, requireRole, uploadPostImage } from '../../middleware/index.js';
import AdminBannerController from '../../controllers/admin/AdminBannerController.js';
import { uploadBannerImage } from '../../middleware/upload.js';

const router = express.Router();

//AuthController
router.post(
    '/create',
    authenticateJWT,
    requireRole('admin'),
    uploadBannerImage('file'),
    AdminBannerController.createBanner,
);
router.put(
    '/update/:id',
    authenticateJWT,
    requireRole('admin'),
    uploadBannerImage('file'),
    AdminBannerController.updateBanner,
);

export default router;
