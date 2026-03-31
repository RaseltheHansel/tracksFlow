import { Router } from "express";
import { collect } from "../controllers/collectController";
import { collectCors } from "../middleware/cors";

const router = Router();

router.options('/', collectCors, (req, res) => {
    res.status(204).end();
});

router.post('/', collectCors, collect);

export default router;
