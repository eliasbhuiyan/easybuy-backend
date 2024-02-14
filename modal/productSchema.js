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
    img: {
        type: String,
        required: true,
    },
    variant: {
        type: Schema.Types.ObjectId,
        ref: "Variant",
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: "Store",
    },
    update: {
        type: Date,
    },
    create: {
        type: Date,
    },
});

module.exports = mongoose.model("Product", productScema)