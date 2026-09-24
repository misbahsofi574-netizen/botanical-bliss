const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order
router.post("/create-order", async (req, res) => {

    try {

        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Invalid payment amount."
            });
        }

        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: "BB_" + Date.now()
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            order
        });

    } catch (error) {

        console.error(
            "Razorpay order creation error:",
            error
        );

        res.status(500).json({
            message: "Unable to create payment order."
        });
    }
});


// Verify Razorpay payment
router.post("/verify", (req, res) => {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const generatedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(
                    razorpay_order_id +
                    "|" +
                    razorpay_payment_id
                )
                .digest("hex");

        if (
            generatedSignature ===
            razorpay_signature
        ) {

            return res.json({
                success: true,
                message: "Payment verified successfully."
            });

        }

        res.status(400).json({
            success: false,
            message: "Payment verification failed."
        });

    } catch (error) {

        console.error(
            "Payment verification error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Payment verification failed."
        });
    }
});

module.exports = router;