import express from 'express';
import NotificationsController from '../../controllers/notifications/NotificationsController.js';
import { authenticateJWT, requireRole } from '../../middleware/index.js';

const router = express.Router();

//NotificationsController
router.get('/get/all', authenticateJWT, requireRole('user'), NotificationsController.getNotifications);

export default router;
