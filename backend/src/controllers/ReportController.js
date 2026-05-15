import Report from "../models/reportModel.js";


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
