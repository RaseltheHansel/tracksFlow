import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import { getStats, getLiveEvents } from '../controllers/analyticsController';

const router = Router();

// Get - analytics stats for a specific site
router.get('/:siteId', verifyToken, getStats);
router.get('/:siteId/events', verifyToken, getLiveEvents);

export default router;
