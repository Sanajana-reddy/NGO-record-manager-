import express from "express";

import {
  getAllReports,
  getDashboardStats,
  getAllFieldWorkers
} from "../controllers/adminController.js";
import { getAISummary } from "../controllers/aiSummaryController.js";

import { protect } from "../middleware/AuthMiddleware.js";

import { adminOnly } from "../middleware/AdminMiddleware.js";
import {verifyToken, verifyAdmin} from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get(
  "/reports",
  protect,
  adminOnly,
  getAllReports
);

router.get(
  "/stats",
  protect,
  adminOnly,
  getDashboardStats
);

router.get(
  "/workers",
  verifyToken,
  verifyAdmin,
  getAllFieldWorkers
);

router.get(
  "/ai-summary",
  verifyToken,
  verifyAdmin,
  getAISummary
);

export default router;
