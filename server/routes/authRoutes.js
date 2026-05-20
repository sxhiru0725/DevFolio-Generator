import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import { protectRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protectRequired, getMe);

export default router;
