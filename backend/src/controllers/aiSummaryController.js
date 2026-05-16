import { GoogleGenAI } from "@google/genai";
import Report from "../models/ReportModel.js";

const buildReportPrompt = (reports) => {
  const reportLines = reports.map((report, index) => {
    const activityType = report.activityType || "Not specified";
    const region = report.region || "Not specified";
    const beneficiariesCount = Number(report.beneficiariesCount) || 0;
    const attendance = Number(report.attendance) || 0;
    const issues = report.issues || "No issues reported";
    const description = report.description || "No description provided";

    return [
      `Report ${index + 1}`,
      `Activity Type: ${activityType}`,
      `Region: ${region}`,
      `Beneficiaries Count: ${beneficiariesCount}`,
      `Attendance: ${attendance}`,
      `Issues: ${issues}`,
      `Description: ${description}`,
    ].join("\n");
  });

  return `
You are an NGO operations analyst. Review the field reports below and generate a concise, professional operational intelligence summary for admin leadership.

Focus on:
- NGO activity summary
- common issues
- high activity regions
- operational risks
- recommendations

Format the response with these exact markdown headings:
## Overview
## Issues
## High Activity Regions
## Operational Risks
## Recommendations

Use clear bullets where helpful. Do not invent facts that are not supported by the reports.

Field Reports:
${reportLines.join("\n\n")}
`;
};

export const getAISummary = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "Gemini API key is not configured.",
      });
    }

    const reports = await Report.find()
      .select(
        "activityType region beneficiariesCount attendance issues description createdAt"
      )
      .sort({ createdAt: -1 })
      .lean();

    if (!reports.length) {
      return res.status(200).json({
        summary:
          "No field reports are available yet. Submit reports before generating an AI operational summary.",
        reportCount: 0,
        generatedAt: new Date().toISOString(),
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = buildReportPrompt(reports);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.status(200).json({
      summary: response.text || "Gemini did not return a summary.",
      reportCount: reports.length,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("AI summary generation failed:", error);

    res.status(500).json({
      message: "Failed to generate AI summary.",
      error: error.message,
    });
  }
};
