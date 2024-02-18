const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
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

module.exports = mongoose.model("Option", optionSchema)