const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    value: [
        {
            name: String,
            required: true,
        },
        {
            price: String,
        },
        {
            quantity: String,
            required: true,
        }
    ],
    variant: {
        type: Schema.Types.ObjectId,
        ref: "Variant",
    }
});

module.exports = mongoose.model("Option", optionSchema)