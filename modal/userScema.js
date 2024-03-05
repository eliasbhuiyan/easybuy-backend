const mongoose = require("mongoose");
const { Schema } = mongoose;

const userScema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "merchant"],
  },
  update: {
    type: Date,
  },
  create: {
    type: Date,
    default: Date.now,
  },
  addressOne: {
    type: String,
    required: true,
  },
  addressTwo: {
    type: String,
    default: null,
  },
  zipCode: {
    type: String,
  },
  city: {
    type: String,
  },
  division: {
    type: String,
  },
  district: {
    type: String,
  },
  otp: {
    type: String,
  },
});

module.exports = mongoose.model("User", userScema);
