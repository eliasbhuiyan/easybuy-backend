const mongoose = require("mongoose");
const { Schema } = mongoose;

const catagoryScema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subCatagory: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCatagory",
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
module.exports = mongoose.model("Catagory", catagoryScema);
