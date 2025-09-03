import express from 'express';
import UserController from '../controllers/user/UserController.js';
import { authenticateJWT, requireRole, filterAllowedFields } from '../middleware/index.js';
import { uploadAvatar } from '../middleware/upload.js';

const router = express.Router();

//AuthController
router.put('/update/avatar', authenticateJWT, requireRole('user'), uploadAvatar('avatar'), UserController.updateAvatar);
router.put(
    '/update/me',
    authenticateJWT,
    requireRole('user'),
    filterAllowedFields('user'),
    UserController.updateMeInfo,
);
router.get('/:id', authenticateJWT, requireRole('user'), UserController.getUserById);
router.get('/me/all', authenticateJWT, requireRole('user'), UserController.getMeALlInfor);
router.get('/me/less', authenticateJWT, requireRole('user'), UserController.getMeInfor);

export default router;
