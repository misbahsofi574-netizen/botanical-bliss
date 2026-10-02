const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");


/* =========================================================
   DASHBOARD STATISTICS
========================================================= */

const getDashboardStats = async (req, res) => {
    try {

        /* -------------------------------------------------
           BASIC COUNTS
        ------------------------------------------------- */

        const totalUsers = await User.countDocuments();

        const totalOrders = await Order.countDocuments();

        const totalProducts = await Product.countDocuments();

        const pendingOrders = await Order.countDocuments({
            status: {
                $in: ["Placed", "Processing"]
            }
        });


        /* -------------------------------------------------
           INVENTORY
        ------------------------------------------------- */

        const lowStockProducts = await Product.countDocuments({
            stock: {
                $gte: 0,
                $lte: 5
            }
        });

        const outOfStockProducts = await Product.countDocuments({
            stock: {
                $lte: 0
            }
        });


        /* -------------------------------------------------
           REVENUE
           Cancelled orders are excluded.
        ------------------------------------------------- */

        const revenueResult = await Order.aggregate([
            {
                $match: {
                    status: {
                        $ne: "Cancelled"
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ]);

        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;


        /* -------------------------------------------------
           TODAY'S REVENUE
        ------------------------------------------------- */

        const startOfToday = new Date();

        startOfToday.setHours(0, 0, 0, 0);

        const startOfTomorrow = new Date(startOfToday);

        startOfTomorrow.setDate(
            startOfTomorrow.getDate() + 1
        );

        const todayRevenueResult = await Order.aggregate([
            {
                $match: {
                    orderDate: {
                        $gte: startOfToday,
                        $lt: startOfTomorrow
                    },
                    status: {
                        $ne: "Cancelled"
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    revenue: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ]);

        const todayRevenue =
            todayRevenueResult.length > 0
                ? todayRevenueResult[0].revenue
                : 0;


        /* -------------------------------------------------
           THIS MONTH'S REVENUE
        ------------------------------------------------- */

        const startOfMonth = new Date();

        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const startOfNextMonth = new Date(startOfMonth);

        startOfNextMonth.setMonth(
            startOfNextMonth.getMonth() + 1
        );

        const monthRevenueResult = await Order.aggregate([
            {
                $match: {
                    orderDate: {
                        $gte: startOfMonth,
                        $lt: startOfNextMonth
                    },
                    status: {
                        $ne: "Cancelled"
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    revenue: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ]);

        const monthRevenue =
            monthRevenueResult.length > 0
                ? monthRevenueResult[0].revenue
                : 0;

                /* -------------------------------------------------
   PREVIOUS MONTH'S REVENUE
   Cancelled orders are excluded.
------------------------------------------------- */

const startOfPreviousMonth = new Date(startOfMonth);

startOfPreviousMonth.setMonth(
    startOfPreviousMonth.getMonth() - 1
);

const startOfNextPreviousMonth = new Date(startOfMonth);

const previousMonthRevenueResult =
    await Order.aggregate([

        {
            $match: {

                orderDate: {
                    $gte: startOfPreviousMonth,
                    $lt: startOfMonth
                },

                status: {
                    $ne: "Cancelled"
                }

            }
        },

        {
            $group: {

                _id: null,

                revenue: {
                    $sum: "$totalAmount"
                }

            }
        }

    ]);

const previousMonthRevenue =
    previousMonthRevenueResult.length > 0
        ? previousMonthRevenueResult[0].revenue
        : 0;


        /* -------------------------------------------------
           ORDER STATUS BREAKDOWN
        ------------------------------------------------- */

        const statusResult = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);

        const orderStatus = {
            Placed: 0,
            Processing: 0,
            Shipped: 0,
            Delivered: 0,
            Cancelled: 0
        };

        statusResult.forEach(item => {

            if (
                Object.prototype.hasOwnProperty.call(
                    orderStatus,
                    item._id
                )
            ) {
                orderStatus[item._id] = item.count;
            }

        });


        /* -------------------------------------------------
           SALES OVERVIEW
           Supports:
           7 days
           30 days
           3 months

           Default = 7 days
        ------------------------------------------------- */

        const requestedPeriod =
            req.query.period || "7days";

        let salesOverview = [];


        /* =================================================
           7 DAYS
        ================================================= */

        if (requestedPeriod === "7days") {

            const startDate = new Date();

            startDate.setDate(
                startDate.getDate() - 6
            );

            startDate.setHours(0, 0, 0, 0);


            const salesResult = await Order.aggregate([
                {
                    $match: {
                        orderDate: {
                            $gte: startDate
                        },
                        status: {
                            $ne: "Cancelled"
                        }
                    }
                },

                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$orderDate",
                                timezone: "Asia/Kolkata"
                            }
                        },

                        revenue: {
                            $sum: "$totalAmount"
                        },

                        orders: {
                            $sum: 1
                        }
                    }
                },

                {
                    $sort: {
                        _id: 1
                    }
                }
            ]);


            for (let i = 0; i < 7; i++) {

                const date = new Date(startDate);

                date.setDate(
                    startDate.getDate() + i
                );


                const year = date.getFullYear();

                const month = String(
                    date.getMonth() + 1
                ).padStart(2, "0");

                const day = String(
                    date.getDate()
                ).padStart(2, "0");


                const dateKey =
                    `${year}-${month}-${day}`;


                const existingDay =
                    salesResult.find(
                        item => item._id === dateKey
                    );


                salesOverview.push({
                    date: dateKey,

                    revenue:
                        existingDay
                            ? existingDay.revenue
                            : 0,

                    orders:
                        existingDay
                            ? existingDay.orders
                            : 0
                });
            }

        }


        /* =================================================
           30 DAYS
        ================================================= */

        else if (requestedPeriod === "30days") {

            const startDate = new Date();

            startDate.setDate(
                startDate.getDate() - 29
            );

            startDate.setHours(0, 0, 0, 0);


            const salesResult = await Order.aggregate([
                {
                    $match: {
                        orderDate: {
                            $gte: startDate
                        },
                        status: {
                            $ne: "Cancelled"
                        }
                    }
                },

                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$orderDate",
                                timezone: "Asia/Kolkata"
                            }
                        },

                        revenue: {
                            $sum: "$totalAmount"
                        },

                        orders: {
                            $sum: 1
                        }
                    }
                },

                {
                    $sort: {
                        _id: 1
                    }
                }
            ]);


            for (let i = 0; i < 30; i++) {

                const date = new Date(startDate);

                date.setDate(
                    startDate.getDate() + i
                );


                const year = date.getFullYear();

                const month = String(
                    date.getMonth() + 1
                ).padStart(2, "0");

                const day = String(
                    date.getDate()
                ).padStart(2, "0");


                const dateKey =
                    `${year}-${month}-${day}`;


                const existingDay =
                    salesResult.find(
                        item => item._id === dateKey
                    );


                salesOverview.push({
                    date: dateKey,

                    revenue:
                        existingDay
                            ? existingDay.revenue
                            : 0,

                    orders:
                        existingDay
                            ? existingDay.orders
                            : 0
                });
            }

        }


        /* =================================================
           3 MONTHS
           Monthly aggregation
        ================================================= */

        else if (requestedPeriod === "3months") {

            const startDate = new Date();

            startDate.setMonth(
                startDate.getMonth() - 2
            );

            startDate.setDate(1);

            startDate.setHours(0, 0, 0, 0);


            const salesResult = await Order.aggregate([
                {
                    $match: {
                        orderDate: {
                            $gte: startDate
                        },
                        status: {
                            $ne: "Cancelled"
                        }
                    }
                },

                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m",
                                date: "$orderDate",
                                timezone: "Asia/Kolkata"
                            }
                        },

                        revenue: {
                            $sum: "$totalAmount"
                        },

                        orders: {
                            $sum: 1
                        }
                    }
                },

                {
                    $sort: {
                        _id: 1
                    }
                }
            ]);


            for (let i = 0; i < 3; i++) {

                const date = new Date(startDate);

                date.setMonth(
                    startDate.getMonth() + i
                );


                const year = date.getFullYear();

                const month = String(
                    date.getMonth() + 1
                ).padStart(2, "0");


                const dateKey =
                    `${year}-${month}`;


                const existingMonth =
                    salesResult.find(
                        item => item._id === dateKey
                    );


                salesOverview.push({
                    date: dateKey,

                    revenue:
                        existingMonth
                            ? existingMonth.revenue
                            : 0,

                    orders:
                        existingMonth
                            ? existingMonth.orders
                            : 0
                });
            }

        }


       /* =========================================================
   BEST SELLING PRODUCTS
========================================================= */

const bestSellingResult = await Order.aggregate([
    {
        $match: {
            status: {
                $ne: "Cancelled"
            }
        }
    },

    {
        $unwind: "$items"
    },

    {
        $group: {
            _id: "$items.name",

            unitsSold: {
                $sum: "$items.quantity"
            },

            revenue: {
                $sum: {
                    $multiply: [
                        "$items.price",
                        "$items.quantity"
                    ]
                }
            },

            image: {
                $first: "$items.image"
            }
        }
    },

    {
        $sort: {
            unitsSold: -1
        }
    },

    {
        $limit: 5
    }
]);

/*
   Attach the actual Product MongoDB ID.
   Orders currently identify products by name,
   so we find the matching product from Product collection.
*/

const bestSellingProducts = await Promise.all(

    bestSellingResult.map(async product => {

        const productData =
            await Product.findOne({
                name: product._id
            }).select("_id");

        return {

            _id:
                productData
                    ? productData._id
                    : null,

            name:
                product._id,

            unitsSold:
                product.unitsSold,

            revenue:
                product.revenue,

            image:
                product.image || ""

        };

    })

);
        /* =========================================================
   INVENTORY ALERTS
========================================================= */

const lowStockList = await Product.find({
    stock: {
        $gte: 0,
        $lte: 5
    }
})
.sort({
    stock: 1
})
.limit(10)
.select("_id name stock price image category status");
                


        /* -------------------------------------------------
           RECENT USERS
        ------------------------------------------------- */

        const recentUsers =
            await User.find()
                .sort({
                    createdAt: -1
                })
                .limit(5)
                .select(
                    "name email role createdAt"
                );


        /* -------------------------------------------------
           FINAL RESPONSE
        ------------------------------------------------- */

        res.json({

            /* Basic dashboard numbers */

            totalProducts,

            totalOrders,

            totalUsers,

            pendingOrders,


            /* Revenue */

totalRevenue,
todayRevenue,
monthRevenue,
previousMonthRevenue,

            /* Inventory */

            lowStockProducts,

            outOfStockProducts,


            /* Order status */

            orderStatus,


            /* Sales chart */

            salesOverview,

            salesPeriod: requestedPeriod,


            /* Best sellers */

            bestSellingProducts,


            /* Inventory alerts */

            lowStockList,


            /* Recent users */

            recentUsers

        });

    }

    catch (error) {

        console.error(
            "Dashboard stats error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to load dashboard statistics"

        });

    }
};


/* =========================================================
   RECENT ORDERS
========================================================= */

const getRecentOrders = async (req, res) => {

    try {

        const orders =
            await Order.find()

                .sort({
                    orderDate: -1
                })

                .limit(5)

                .select(
                    "orderId customer.fullName totalAmount status orderDate"
                );

        res.json(orders);

    } catch (error) {

        console.error(
            "Recent orders error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to load recent orders"

        });

    }

};


/* =========================================================
   ALL ORDERS
========================================================= */

const getAllOrders = async (req, res) => {

    try {

        const orders =
            await Order.find()

                .sort({
                    orderDate: -1
                })

                .select(
                    "orderId customer paymentMethod paymentStatus totalAmount status orderDate"
                );

        res.json(orders);

    } catch (error) {

        console.error(
            "All orders error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to load orders"

        });

    }

};


/* =========================================================
   SINGLE ORDER DETAILS
========================================================= */

const getOrderDetails = async (req, res) => {

    try {

        const order =
            await Order.findOne({

                orderId:
                    req.params.orderId

            });

        if (!order) {

            return res.status(404).json({

                message:
                    "Order not found"

            });

        }

        res.json(order);

    } catch (error) {

        console.error(
            "Order details error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to load order details"

        });

    }

};


/* =========================================================
   UPDATE ORDER STATUS
========================================================= */

const updateOrderStatus = async (req, res) => {

    try {

        const {
            status
        } = req.body;


        const allowedStatuses = [

            "Placed",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"

        ];


        if (
            !allowedStatuses.includes(status)
        ) {

            return res.status(400).json({

                message:
                    "Invalid order status"

            });

        }


        const order =
            await Order.findOneAndUpdate(

                {
                    orderId:
                        req.params.orderId
                },

                {
                    status: status
                },

                { returnDocument: "after" }

            );


        if (!order) {

            return res.status(404).json({

                message:
                    "Order not found"

            });

        }


        res.json({

            message:
                "Order status updated successfully",

            order:
                order

        });

    } catch (error) {

        console.error(
            "Update order status error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to update order status"

        });

    }

};


/* =========================================================
   ALL USERS
========================================================= */

const getAllUsers = async (req, res) => {

    try {

        const users =
            await User.find()

                .sort({
                    createdAt: -1
                })

                .select(
                    "name email role createdAt"
                );

        res.json(users);

    } catch (error) {

        console.error(
            "All users error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to load users"

        });

    }

};


/* =========================================================
   ALL PRODUCTS
========================================================= */

const getAllProducts = async (req, res) => {

    try {

        const products =
            await Product.find()

                .sort({
                    createdAt: -1
                });

        res.json(products);

    } catch (error) {

        console.error(
            "All products error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to load products"

        });

    }

};


/* =========================================================
   CREATE PRODUCT
========================================================= */

const createProduct = async (req, res) => {

    try {

        const {

            name,
            category,
            price,
            image,
            description,
            stock,
            status

        } = req.body;


        if (
            !name ||
            !category ||
            price === undefined
        ) {

            return res.status(400).json({

                message:
                    "Name, category and price are required"

            });

        }


        const product =
            await Product.create({

                name,
                category,
                price,
                image,
                description,
                stock,
                status

            });


        res.status(201).json({

            message:
                "Product created successfully",

            product

        });

    } catch (error) {

        console.error(
            "Create product error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to create product"

        });

    }

};


/* =========================================================
   UPDATE PRODUCT
========================================================= */

const updateProduct = async (req, res) => {

    try {

        const product =
            await Product.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true,
                    runValidators: true
                }

            );


        if (!product) {

            return res.status(404).json({

                message:
                    "Product not found"

            });

        }


        res.json({

            message:
                "Product updated successfully",

            product

        });

    } catch (error) {

        console.error(
            "Update product error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to update product"

        });

    }

};


/* =========================================================
   DELETE PRODUCT
========================================================= */

const deleteProduct = async (req, res) => {

    try {

        const product =
            await Product.findByIdAndDelete(
                req.params.id
            );


        if (!product) {

            return res.status(404).json({

                message:
                    "Product not found"

            });

        }


        res.json({

            message:
                "Product deleted successfully"

        });

    } catch (error) {

        console.error(
            "Delete product error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to delete product"

        });

    }

};


/* =========================================================
   EXPORTS
========================================================= */

module.exports = {

    getDashboardStats,

    getRecentOrders,

    getAllOrders,

    getOrderDetails,

    updateOrderStatus,

    getAllUsers,

    getAllProducts,

    createProduct,

    updateProduct,

    deleteProduct

};