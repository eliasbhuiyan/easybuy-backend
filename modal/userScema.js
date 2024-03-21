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
    default: null
  },
  city: {
    type: String,
    default: null
  },
  country: {
    type: String,
    default: null
  },
  state: {
    type: String,
    default: null
  },
  totalOrder: {
    type: Number,
    default: 0,
  },
  otp: {
    type: String,
  },
  forgotpassToken: {
    type: String,
  },
  sec_token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userScema);
