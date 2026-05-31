const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [
        {
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [
            "Pending",
            "Confirmed",
            "Preparing",
            "Out for Delivery",
            "Delivered"
        ],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("Order",orderSchema)