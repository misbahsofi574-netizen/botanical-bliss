require("dotenv").config({
    path: "../.env"
});
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});


async function sendGardenReminder(email, task, date, time) {

    const mailOptions = {

        from: `"Botanical Bliss" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: "🌱 Botanical Bliss Gardening Reminder",

        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: auto;
                padding: 25px;
                border: 1px solid #dfe8df;
                border-radius: 12px;
            ">

                <h2 style="margin-bottom: 10px;">
                    🌱 Botanical Bliss Gardening Reminder
                </h2>

                <p>
                    It's time for your scheduled gardening task:
                </p>

                <h3>
                    ${task}
                </h3>

                <p>
                    <strong>Date:</strong> ${date}
                </p>

                <p>
                    <strong>Time:</strong> ${time}
                </p>

                <p>
                    Happy Gardening! 🌿
                </p>

            </div>
        `
    };

    await transporter.sendMail(mailOptions);
}


module.exports = {
    sendGardenReminder
};