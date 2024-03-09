const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCatagoryScema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "waiting",
    enum: ["waiting", "approved", "rejected"],
  },
  catagory: {
    type: Schema.Types.ObjectId,
    ref: "Catagory",
  },
  update: {
    type: Date,
  },
  create: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("SubCatagory", subCatagoryScema);
