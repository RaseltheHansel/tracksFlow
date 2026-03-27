import { Router } from "express";
import { collect } from "../controllers/collectController";

const router = Router();

router.options('/', (req, res) => {
    res.status(200).end();
});

router.post('/', collect);

export default router;