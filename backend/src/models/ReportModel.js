import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    activityType: {
      type: String,
      required: true,
    },

    region: {
      type: String,
      required: true,
    },

    beneficiariesCount: {
      type: Number,
      required: true,
    },

    issues: {
      type: String,
    },

    description: {
      type: String,
    },

    attendance: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;