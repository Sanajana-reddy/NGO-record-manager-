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

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    age: {
      type: Number,
    },

    gender: {
      type: String,
      default: "",
    },

    primaryRegion: {
      type: String,
      default: "",
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

const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    userSchema
  );

export default User;
