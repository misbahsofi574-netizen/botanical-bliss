const express = require("express");
const router = express.Router();

const GardenReminder = require("../models/GardenReminder");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");


// CREATE A GARDENING REMINDER
router.post("/", protect, async (req, res) => {

    try {

        const { task, date, time } = req.body;

        if (!task || !date || !time) {

            return res.status(400).json({
                message: "Task, date and time are required."
            });

        }

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found."
            });

        }

        const reminder = await GardenReminder.create({

            user: user._id,
            email: user.email,
            task,
            date,
            time

        });

        res.status(201).json({

            message: "Gardening reminder scheduled successfully.",
            reminder

        });

    } catch (error) {

        console.error(
            "Garden reminder error:",
            error
        );

        res.status(500).json({

            message: "Failed to schedule gardening reminder."

        });

    }

});


module.exports = router;
