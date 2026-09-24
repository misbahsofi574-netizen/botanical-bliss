const mongoose = require("mongoose");

const gardenPostSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        userName: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        caption: {
            type: String,
            required: true,
            trim: true
        },

        likes: {
    type: Number,
    default: 0
},

likedBy: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "GardenPost",
    gardenPostSchema
);