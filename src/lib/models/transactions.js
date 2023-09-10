import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  amount: {
    type: Number,
    min: 0,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },

  date: {
    type: Date,
    default: Date.now,
  },

  address: {
    type: String,
  },

  bankNumber: {
    type: Number,
  },

  bankName: {
    type: String,
  },

  swift: {
    type: String,
  },
  wallet: {
    type: String,
    enum: ["bitcoin", "ethereum", "dogecoin"],
  },

  payoutMode: {
    type: String,
    enum: ["crypto", "bank"],
    required: true,
  },
});

export const Withdrawal =
  mongoose.models.Withdrawal || mongoose.model("Withdrawal", withdrawalSchema);
