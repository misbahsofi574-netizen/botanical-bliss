const dns = require("dns");
const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

dns.setServers(["8.8.8.8"]);


const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderroutes");
const gardenReminderRoutes = require("./routes/gardenReminder");
const gardenPostRoutes = require("./routes/gardenPostRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const express = require("express");
const cron = require("node-cron");
const GardenReminder = require("./models/GardenReminder");
const { sendGardenReminder } = require("./emailService");
const cors = require("cors");


const connectDB = require("./config/db");

const app = express();
// Connect to MongoDB
connectDB();

// Middleware

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/garden-reminders", gardenReminderRoutes);
app.use("/api/garden-posts", gardenPostRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);


// Home/Test route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Botanical Bliss API 🌿"
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Botanical Bliss server is running on port ${PORT}`);
});



cron.schedule("* * * * *", async () => {

    try {

        const now = new Date();

        const currentDate = now.toISOString().split("T")[0];

        const currentTime =
            now.toTimeString().slice(0, 5);

        const reminders = await GardenReminder.find({
            date: currentDate,
            time: currentTime,
            sent: false
        });

        for (const reminder of reminders) {

            await sendGardenReminder(
                reminder.email,
                reminder.task,
                reminder.date,
                reminder.time
            );

            reminder.sent = true;

            await reminder.save();

            console.log(
                `Garden reminder email sent to ${reminder.email}`
            );
        }

    } catch (error) {

        console.error(
            "Garden reminder scheduler error:",
            error.message
        );

    }

});
