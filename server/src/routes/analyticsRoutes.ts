import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import { getStats } from '../controllers/analyticsController';

const router = Router();

// Get - analytics stats for a specific site
router.get('/:siteId', verifyToken, getStats);

export default router;