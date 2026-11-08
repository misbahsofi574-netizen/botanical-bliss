
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            minlength: [2, "Product name must be at least 2 characters"]
        },

        category: {
            type: String,
            required: [true, "Product category is required"],
            trim: true,
            minlength: [2, "Category must be at least 2 characters"]
        },

        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0.01, "Price must be greater than zero"]
        },

        image: {
            type: String,
            trim: true,
            default: ""
        },

        description: {
            type: String,
            trim: true,
            maxlength: [1000, "Description cannot exceed 1000 characters"],
            default: ""
        },

        stock: {
            type: Number,
            min: [0, "Stock cannot be negative"],
            default: 0
        },

        status: {
            type: String,
            enum: {
                values: ["Active", "Inactive"],
                message: "Status must be Active or Inactive"
            },
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);
