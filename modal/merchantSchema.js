const mongoose = require("mongoose");
const { Schema } = mongoose;

const merchantScema = new Schema({
  email: {
    type: String,
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("Merchant", merchantScema);