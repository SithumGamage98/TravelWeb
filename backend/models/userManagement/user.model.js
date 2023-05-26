const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    userType: { type: String },
    verified: { type: Boolean, default: false },
    adminCreated: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
