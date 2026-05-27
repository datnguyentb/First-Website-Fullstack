import express from 'express';
import NotificationsController from '../../controllers/notifications/NotificationsController.js';
import { authenticateJWT, requireRole } from '../../middleware/index.js';

const router = express.Router();

//NotificationsController
router.get('/get/all', authenticateJWT, requireRole('user'), NotificationsController.getNotifications);
router.post('/mark-all-as-read', authenticateJWT, requireRole('user'), NotificationsController.markAllAsRead);

export default router;
