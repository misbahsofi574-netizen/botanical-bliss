const mongoose = require("mongoose");

const gardenReminderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        email: {
            type: String,
            required: true
        },

        task: {
            type: String,
            required: true
        },

        date: {
            type: String,
            required: true
        },

        time: {
            type: String,
            required: true
        },

        sent: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "GardenReminder",
    gardenReminderSchema
);