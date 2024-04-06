const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            variant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Variant',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
