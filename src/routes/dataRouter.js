import { entry, getEntry } from "../controllers/dataController.js"
import { Router } from "express";

const router = Router();

router.post("/entry", entry);
router.get("/entry", getEntry);

export default router;