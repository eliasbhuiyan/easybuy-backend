const mongoose = require("mongoose");
const { Schema } = mongoose;

const productScema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    required: true,
  },
  subCatagory: {
    type: Schema.Types.ObjectId,
    ref: "SubCatagory",
    required: true,
  },
  variant: [
    {
      type: Schema.Types.ObjectId,
      ref: "Variant",
    },
  ],
  slug: {
    type: String,
    required: true,
  },
  // Ganarate 4 digit Random Id default
  shortID: {
    type: String,
    default: function () {
      return `#${Math.floor(1000 + Math.random() * 9000)}`;
    },
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved",],
  },
  reviews: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
      },
      comment: {
        type: String,
      },
    },
  ],
  update: {
    type: Date,
  },
  create: {
    type: Date,
  },
});

module.exports = mongoose.model("Product", productScema);
