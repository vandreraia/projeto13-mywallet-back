import { entry, getEntry } from "../controllers/dataController.js"
import { Router } from "express";
import validateUser from "../middlewares/validateUser.js";

const router = Router();

router.post("/entry",validateUser, entry);
router.get("/entry", getEntry);

export default router;