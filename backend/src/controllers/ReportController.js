import Report from "../models/ReportModel.js";
import mongoose from "mongoose";


// CREATE REPORT
export const createReport = async (req, res) => {
  try {

    const {
      activityType,
      region,
      beneficiariesCount,
      issues,
      description,
      attendance,
    } = req.body;

    const report = await Report.create({
      workerId: req.user.id,
      activityType,
      region,
      beneficiariesCount,
      issues,
      description,
      attendance,
    });

    res.status(201).json({
      message: "Report submitted successfully",
      report,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET ALL REPORTS
export const getReports = async (req, res) => {
  try {

    const reports = await Report.find({
      workerId: req.user.id,
    })
      .sort({ createdAt: -1 });

    res.status(200).json(reports);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    if (req.user.role !== "admin" && report.workerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update" });
    }

    const updated = await Report.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    if (req.user.role !== "admin" && report.workerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    await Report.findByIdAndDelete(id);
    res.status(200).json({ message: "Report deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReportDates = async (req, res) => {
  try {
    const workerId = req.user.id;
    const dates = await Report.aggregate([
      { $match: { workerId: mongoose.Types.ObjectId(workerId) } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $project: { date: "$_id", count: 1, _id: 0 } },
      { $sort: { date: 1 } },
    ]);

    res.status(200).json(dates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
