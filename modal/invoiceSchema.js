const mongoose = require("mongoose");
const { Schema } = mongoose;

const invoiceSchema = new Schema({
    customer: {
        address: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        invoiceId: {
            type: String,
            required: true
        }
    },
    items: [],
    totals: {
        balanceDue: {
            type: Number,
            required: true
        },
        paid: {
            type: Number,
            required: true
        },
        returnAmount: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Invoice", invoiceSchema);