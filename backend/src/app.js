import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes.js";
import reportRoutes from "./routes/ReportRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import beneficiaryRoutes from "./routes/BeneficiaryRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
  res.send("NGO Dashboard API Running");
});
app.use(
  "/api/beneficiaries",
  beneficiaryRoutes
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.log(err));