// routes/news.js
import express from 'express';
import { authenticateJWT, requireRole, uploadPostImage } from '../../middleware/index.js';
import AdminBannerController from '../../controllers/admin/AdminBannerController.js';
import { uploadBannerImage } from '../../middleware/upload.js';

const router = express.Router();

//create Banner router
router.post(
    '/create',
    authenticateJWT,
    requireRole('admin'),
    uploadBannerImage('file'),
    AdminBannerController.createBanner,
);

//update Banner router
router.put(
    '/update',
    authenticateJWT,
    requireRole('admin'),
    uploadBannerImage('file'),
    AdminBannerController.updateBanner,
);

//get Banner router
router.get('/get_all', authenticateJWT, requireRole('admin'), AdminBannerController.getAllBanners);

//delete Banner
router.delete('/:id', authenticateJWT, requireRole('admin'), AdminBannerController.deleteBanner);

//toggle Status
router.put('/:id/toggle', authenticateJWT, requireRole('admin'), AdminBannerController.toggleStatus);

export default router;
