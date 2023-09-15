import mongoose from "mongoose";
import { hashPassword } from "../hashing";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
    minLength: [2, "First name must be at least 2 characters long"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
    minLength: [2, "Last name must be at least 2 characters long"],
  },
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
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password must be at least 8 characters long"],
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  isActive: {
    type: Boolean,
    default: false,
  },

  dateJoined: {
    type: Date,
    default: Date.now,
  },

  lastLogin: {
    type: Date,
    default: Date.now,
  },

  history: {
    type: [
      {
        date: Date,
        amount: Number,
        txType: {
          type: String,
          enum: ["credit", "withdrawal"],
        },
        remark: String,
        id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },

  notifications: {
    type: [
      {
        message: String,
        date: Date,
        isRead: Boolean,
        id: mongoose.Schema.Types.ObjectId,
      },
    ],

    default: [
      {
        title: "Welcome to the platform",
        message: "We are glad to have you here",
        date: Date.now(),
        isRead: false,
      },
    ],
  },

  account: {
    withdrawals: {
      type: Number,
      min: 0,
      default: 0,
    },

    deposits: {
      type: Number,
      min: 0,
      default: 0,
    },

    balance: {
      type: Number,
      min: 0,
      default: 0,
    },

    bonus: {
      type: Number,
      min: 0,
      default: 0,
    },

    dogecoin: {
      type: Number,
      min: 0,
      default: 0,
    },

    ethereum: {
      type: Number,
      min: 0,
      default: 0,
    },

    bitcoin: {
      type: Number,
      min: 0,
      default: 0,
    },

    smartchain: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.comparePassword = function (password) {
  const match = hashPassword(password) === this.password;

  return match;
};

userSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email }).exec();

  if (!user) {
    throw new Error("Invalid login");
  }

  const match = user.comparePassword(password);

  if (!match) {
    throw new Error("Invalid login");
  }

  user.lastLogin = Date.now();

  await user.save();

  return user;
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
