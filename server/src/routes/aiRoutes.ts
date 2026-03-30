import { Router } from "express";
import { verifyToken } from '../middleware/auth';
import { getInsights } from "../controllers/aiController";

const router = Router();

// Get - generative ai insights for a specific site 
router.get('/:siteId/insights', verifyToken, getInsights);

export default router;