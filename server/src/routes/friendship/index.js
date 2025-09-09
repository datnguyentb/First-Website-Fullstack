import express from 'express';
import friendshipRouter from './friendship.js';

const router = express.Router();

router.use('/friendship', friendshipRouter);
export default router;
