import mongoose from "../db";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export const User = mongoose.model("User", userSchema);
