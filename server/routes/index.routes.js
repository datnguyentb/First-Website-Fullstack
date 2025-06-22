import express from 'express';
import { sayHello } from '../controllers/home.controller.js';

const router = express.Router();

router.get('/', sayHello);

export default router;
