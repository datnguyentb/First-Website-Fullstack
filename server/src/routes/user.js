import express from 'express';
import UserController from '../controllers/UserController.js';
import { authenticateJWT, requireRole, filterAllowedFields } from '../middleware/index.js';
import { uploadAvatar } from '../middleware/upload.js';

const router = express.Router();

//AuthController
router.get('/me', authenticateJWT, requireRole('user'), UserController.getMe);
router.put('/update/avatar', authenticateJWT, requireRole('user'), uploadAvatar('avatar'), UserController.updateAvatar);
router.put(
    '/update/me',
    authenticateJWT,
    requireRole('user'),
    filterAllowedFields('user'),
    UserController.updateMeInfo,
);
router.get('/:id', authenticateJWT, requireRole('user'), UserController.getUserProfile);

export default router;
