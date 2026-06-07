import express from "express";

import {
  googleLogin,
  getProfile,
  updateProfile,
} from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/google", googleLogin);
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

export default router;
