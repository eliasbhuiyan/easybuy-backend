const mongoose = require("mongoose");
const { Schema } = mongoose;

const variantScema = new Schema({
    color: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    size: {
        type: String,
    },
    storage: {
        type: String,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    update: {
        type: Date,
    },
    create: {
        type: Date,
    },
});

module.exports = mongoose.model("Variant", variantScema)
