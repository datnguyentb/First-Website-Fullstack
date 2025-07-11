import express from 'express';
import UserController from '../app/controllers/UserController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';

const router = express.Router();

//AuthController
router.get('/:id', authenticateJWT, UserController.getUserProfile);

export default router;
