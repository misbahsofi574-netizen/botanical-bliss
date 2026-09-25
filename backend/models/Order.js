const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        image: {
            type: String,
            default: ""
        }
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        userEmail: {
            type: String,
            required: true
        },

        customer: {
            fullName: {
                type: String,
                required: true
            },

            email: {
                type: String,
                required: true
            },

            phone: {
                type: String,
                required: true
            },

            address: {
                type: String,
                required: true
            },

            city: {
                type: String,
                required: true
            },

            pincode: {
                type: String,
                required: true
            }
        },

        paymentMethod: {
            type: String,
            enum: ["cod", "online"],
            required: true
        },

        paymentStatus: {
            type: String,
            default: "Pending"
        },

        razorpayOrderId: {
            type: String,
            default: null
        },

        razorpayPaymentId: {
            type: String,
            default: null
        },

        items: {
            type: [orderItemSchema],
            required: true
        },

        totalAmount: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Placed",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled"
            ],
            default: "Placed"
        },

        orderDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);