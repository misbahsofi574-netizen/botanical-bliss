const Order = require("../models/Order");

/* ==========================================
   CREATE ORDER
========================================== */

const createOrder = async (req, res) => {
    try {
        const {
            orderId,
            userEmail,
            customer,
            paymentMethod,
            paymentStatus,
            razorpayOrderId,
            razorpayPaymentId,
            items,
            totalAmount,
            orderDate
        } = req.body;

        if (
            !orderId ||
            !customer ||
            !items ||
            items.length === 0 ||
            totalAmount === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Required order information is missing."
            });
        }

        const existingOrder = await Order.findOne({
            orderId
        });

        if (existingOrder) {
            return res.status(409).json({
                success: false,
                message: "This order already exists."
            });
        }

        const order = await Order.create({
            orderId,

            userId: req.user.id,

            userEmail:
                userEmail || req.user.email,

            customer,

            paymentMethod,

            paymentStatus:
                paymentStatus ||
                (paymentMethod === "online"
                    ? "Paid"
                    : "Pending"),

            razorpayOrderId:
                razorpayOrderId || null,

            razorpayPaymentId:
                razorpayPaymentId || null,

            items,

            totalAmount,

            orderDate:
                orderDate || new Date(),

            status: "Placed"
        });

        res.status(201).json({
            success: true,
            message: "Order saved successfully.",
            order
        });

    } catch (error) {
        console.error(
            "Create order error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to save order."
        });
    }
};


/* ==========================================
   GET CURRENT USER ORDERS
========================================== */

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.user.id
        }).sort({
            orderDate: -1
        });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error(
            "Get my orders error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to load orders."
        });
    }
};


/* ==========================================
   CANCEL MY ORDER
========================================== */

const cancelMyOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOne({
            orderId,
            userId: req.user.id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        if (order.status === "Cancelled") {
            return res.status(400).json({
                success: false,
                message: "Order is already cancelled."
            });
        }

        order.status = "Cancelled";

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully.",
            order
        });

    } catch (error) {
        console.error(
            "Cancel order error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to cancel order."
        });
    }
};


/* ==========================================
   GET ALL ORDERS - ADMIN
========================================== */

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate(
                "userId",
                "name email"
            )
            .sort({
                orderDate: -1
            });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error(
            "Get all orders error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to load all orders."
        });
    }
};


module.exports = {
    createOrder,
    getMyOrders,
    cancelMyOrder,
    getAllOrders
};