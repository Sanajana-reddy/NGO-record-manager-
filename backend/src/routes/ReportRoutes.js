import express from "express";

import {
  createReport,
  getReports,
  updateReport,
  deleteReport,
  getReportDates,
} from "../controllers/reportController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createReport);

router.get("/", protect, getReports);

router.get("/dates", protect, getReportDates);

router.put("/:id", protect, updateReport);

router.delete("/:id", protect, deleteReport);

export default router;
