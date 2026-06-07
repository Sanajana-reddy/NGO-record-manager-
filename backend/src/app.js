import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes.js";
import reportRoutes from "./routes/ReportRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import beneficiaryRoutes from "./routes/beneficiaryRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin || "*"); // dynamically reflect request origin
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use(
  "/api/beneficiaries",
  beneficiaryRoutes
);
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get("*path", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));