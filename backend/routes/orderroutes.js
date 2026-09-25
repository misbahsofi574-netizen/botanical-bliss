const express = require("express");

const router = express.Router();

const {
    createOrder,
    getMyOrders,
    cancelMyOrder,
    getAllOrders
} = require("../controllers/ordercontroller");

const protect = require("../middleware/authMiddleware");


/* ==========================================
   USER ROUTES
========================================== */

// Create order
router.post(
    "/",
    protect,
    createOrder
);


// Get logged-in user's orders
router.get(
    "/my-orders",
    protect,
    getMyOrders
);


// Cancel logged-in user's order
router.put(
    "/cancel/:orderId",
    protect,
    cancelMyOrder
);


/* ==========================================
   ADMIN ROUTE
========================================== */

// Get all orders
router.get(
    "/all",
    protect,
    getAllOrders
);


module.exports = router;