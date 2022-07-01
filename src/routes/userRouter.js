import { createUser, loginUser } from "../controllers/userController.js"
import { Router } from "express";

const router = Router();

router.post('/login', loginUser);
router.post('/sign-up', createUser);

export default router;