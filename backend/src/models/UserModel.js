import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    googleId: {
      type: String,
    },

    profilePicture: {
      type: String,
    },

    role: {
      type: String,
      enum: ["admin", "fieldworker"],
      default: "fieldworker",
    },

    region: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;