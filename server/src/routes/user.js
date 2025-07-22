import express from 'express';
import multer from 'multer';
import UserController from '../app/controllers/UserController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';
import { uploadAvatar } from '../middleware/upload.js';
import { filterAllowedFields } from '../middleware/filterAllowedFields.js';

const router = express.Router();

//AuthController
router.get('/me', authenticateJWT, UserController.getMe);
router.put('/update/avatar', authenticateJWT, uploadAvatar('avatar'), UserController.updateAvatar);
router.put('/update/me', authenticateJWT, filterAllowedFields('user'), UserController.updateMeInfo);
router.get('/:id', authenticateJWT, UserController.getUserProfile);

export default router;
