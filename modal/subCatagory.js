const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCatagoryScema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Empty Description ...",
  },
  catagory: {
    type: Schema.Types.ObjectId,
    ref: "Catagory",
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  update: {
    type: Date,
  },
  create: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("SubCatagory", subCatagoryScema);
