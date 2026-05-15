import Report from "../models/ReportModel.js";


// GET ALL REPORTS
export const getAllReports = async (req, res) => {
  try {

    const reports = await Report.find()
      .populate("workerId", "name email region")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {

    const reports = await Report.find();

    const totalReports = reports.length;

    const totalBeneficiaries =
      reports.reduce(
        (sum, report) =>
          sum + report.beneficiariesCount,
        0
      );

    const totalAttendance =
      reports.reduce(
        (sum, report) =>
          sum + report.attendance,
        0
      );

    res.status(200).json({
      totalReports,
      totalBeneficiaries,
      totalAttendance,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};