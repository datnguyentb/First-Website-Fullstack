import express from 'express';
import UserController from '../app/controllers/UserController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';
import { uploadAvatar } from '../middleware/upload.js';

const router = express.Router();

//AuthController
router.get('/me', authenticateJWT, UserController.getMe);
router.put('/update', authenticateJWT, uploadAvatar('avatar'), UserController.updateUser);
router.get('/:id', authenticateJWT, UserController.getUserProfile);

export default router;
