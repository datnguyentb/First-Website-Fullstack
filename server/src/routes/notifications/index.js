import express from 'express';
import NotificationsRouter from './notificationsRouter.js';
const router = express.Router();

router.use('/', NotificationsRouter);
export default router;
