const express = require("express");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");

const router = express.Router();


// Admin test route

router.get("/test", protect, adminOnly, (req, res) => {

    res.json({
        message: "Admin access granted!",
        user: req.user
    });

});


// Dashboard statistics

router.get(
    "/dashboard",
    protect,
    adminOnly,
    adminController.getDashboardStats
);


// Recent orders

router.get(
    "/recent-orders",
    protect,
    adminOnly,
    adminController.getRecentOrders
);

// All orders

router.get(
    "/orders",
    protect,
    adminOnly,
    adminController.getAllOrders
);

// Single order details

router.get(
    "/orders/:orderId",
    protect,
    adminOnly,
    adminController.getOrderDetails
);

// Update order status

router.put(
    "/orders/:orderId/status",
    protect,
    adminOnly,
    adminController.updateOrderStatus
);

// All users

router.get(
    "/users",
    protect,
    adminOnly,
    adminController.getAllUsers
);

router.get(
    "/products",
    protect,
    adminOnly,
    adminController.getAllProducts
);

router.post(
    "/products",
    protect,
    adminOnly,
    adminController.createProduct
);

router.put(
    "/products/:id",
    protect,
    adminOnly,
    adminController.updateProduct
);

router.delete(
    "/products/:id",
    protect,
    adminOnly,
    adminController.deleteProduct
);

module.exports = router;