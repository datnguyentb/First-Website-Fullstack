import express from 'express';
import siteController from '../controllers/user/SiteController.js';

const router = express.Router();

router.get('/', siteController.index);
router.get('/:slug', siteController.redirectHome);

export default router;
