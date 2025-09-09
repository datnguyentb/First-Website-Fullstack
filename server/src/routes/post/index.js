import express from 'express';
import postRouter from './post.js';
import postInteractionRouter from './postInteraction.js';

const router = express.Router();

router.use('/', postRouter);
router.use('/interactions/', postInteractionRouter);

export default router;
