import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  type: {
    type: String,
  },
});

export const Income = mongoose.model("Income", incomeSchema);
