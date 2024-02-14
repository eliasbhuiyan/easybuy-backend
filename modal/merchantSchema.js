const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeScema = new Schema({
  storeName: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  officialEmail: {
    type: String,
    required: true,
  },
  officialPhone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = mongoose.model("Store", storeScema);
