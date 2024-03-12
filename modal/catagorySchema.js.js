const mongoose = require("mongoose");
const { Schema } = mongoose;

const catagoryScema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Empty Description ...",
  },
  subCatagory: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCatagory",
    },
  ],
  status: {
    type: String,
    default: "waiting",
    enum: ["waiting", "published"],
  },
  update: {
    type: Date,
    default: Date.now,
  },
  create: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Catagory", catagoryScema);
