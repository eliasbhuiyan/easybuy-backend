const mongoose = require('mongoose');
const { Schema } = mongoose;

const userScema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addressOne: {
        type: String,
        required: true
    },
    addressTwo: {
        type: String,
        default: null
    },
    zipCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userScema)