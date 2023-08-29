import mongoose from "mongoose";

const prepasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
    },
  },

  tempPassword: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password must be at least 8 characters long"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  used: {
    type: Boolean,
    default: false,
  },
});

export const Prepassword =
  mongoose.models.Prepassword ||
  mongoose.model("Prepassword", prepasswordSchema);
