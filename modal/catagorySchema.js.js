const mongoose = require("mongoose");
const { Schema } = mongoose;

const catagoryScema = new Schema({
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
