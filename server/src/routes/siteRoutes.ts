import { Router } from "express";
import { verifyToken } from '../middleware/auth';
import { getSites, createSite, getSite, updateSite, deleteSite, getSnippet } from "../controllers/siteController";

const router = Router();

router.get('/', verifyToken, getSites);
router.post('/', verifyToken, createSite);
router.get('/:siteId', verifyToken, getSite);
router.put('/:id', verifyToken, updateSite);
router.delete('/:id', verifyToken, deleteSite);
router.get('/:id/snippet', verifyToken, getSnippet);


export default router;