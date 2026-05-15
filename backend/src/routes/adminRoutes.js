import express from "express";

import {
  getAllReports,
  getDashboardStats,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";

import { adminOnly } from "../middleware/adminMiddleware.js";

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

export default router;