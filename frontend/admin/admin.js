document.addEventListener("DOMContentLoaded", () => {

    protectAdminPage();

    loadAdminProfile();

    loadDashboardStats();

    loadRecentOrders();

    loadCategoryProductCounts();

    setupQuickActions();

    setupSalesPeriodSelector();

});


/* =========================================================
   ADMIN PAGE PROTECTION
========================================================= */

function protectAdminPage() {

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    if (!token || !user) {

        window.location.href = "../login.html";
        return;

    }

    // Only admins can access this page
    if (user.role !== "admin") {

        window.location.href = "../dashboard.html";
        return;

    }

}


/* =========================================================
   ADMIN PROFILE
========================================================= */

function loadAdminProfile() {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    if (!user) {
        return;
    }

    const adminName =
        document.getElementById("adminName");

    if (adminName) {

        adminName.textContent =
            user.name || "Admin";

    }

    const welcomeAdminName =
    document.getElementById(
        "welcomeAdminName"
    );

if (welcomeAdminName) {
    welcomeAdminName.textContent =
        user.name || "Admin";
}

}


/* =========================================================
   DASHBOARD STATISTICS
========================================================= */

async function loadDashboardStats(period = "7days") {

    try {

        const token =
            localStorage.getItem("token");

        if (!token) {

            window.location.href =
                "../login.html";

            return;

        }
const response = await fetch(
    `https://botanical-bliss-52ra.onrender.com/api/admin/dashboard?period=${encodeURIComponent(period)}`,
    {
        headers: {
            Authorization:
                "Bearer " + token
        }
    }
);

        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Dashboard stats error:",
                data
            );


            if (
                response.status === 401 ||
                response.status === 403
            ) {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.href =
                    "../login.html";

            }

            return;

        }


        /* =================================================
           TOTAL PRODUCTS
        ================================================= */

        const totalProducts =
            document.getElementById(
                "totalProducts"
            );

        if (totalProducts) {

            totalProducts.textContent =
                data.totalProducts ?? 0;

        }


        /* =================================================
           TOTAL ORDERS
        ================================================= */

        const totalOrders =
            document.getElementById(
                "totalOrders"
            );

        if (totalOrders) {

            totalOrders.textContent =
                data.totalOrders ?? 0;

        }


        /* =================================================
           TOTAL CUSTOMERS
        ================================================= */

        const totalUsers =
            document.getElementById(
                "totalUsers"
            );

        if (totalUsers) {

            totalUsers.textContent =
                data.totalUsers ?? 0;

        }


        /* =================================================
           PENDING ORDERS
        ================================================= */

        const pendingOrders =
            document.getElementById(
                "pendingOrders"
            );

        if (pendingOrders) {

            pendingOrders.textContent =
                data.pendingOrders ?? 0;

        }


        /* =================================================
           TOTAL REVENUE
        ================================================= */

        const totalRevenue =
            document.getElementById(
                "totalRevenue"
            );

        if (totalRevenue) {

            totalRevenue.textContent =
                "₹" +
                Number(
                    data.totalRevenue ?? 0
                ).toLocaleString("en-IN");

        }


        /* =================================================
           LOW STOCK PRODUCTS
        ================================================= */

        const lowStockProducts =
            document.getElementById(
                "lowStockProducts"
            );

        if (lowStockProducts) {

            lowStockProducts.textContent =
                data.lowStockProducts ?? 0;

        }


        /* =================================================
           TODAY REVENUE
        ================================================= */

        const todayRevenue =
            document.getElementById(
                "todayRevenue"
            );

        if (todayRevenue) {

            todayRevenue.textContent =
                "₹" +
                Number(
                    data.todayRevenue ?? 0
                ).toLocaleString("en-IN");

        }


        /* =================================================
           MONTH REVENUE
        ================================================= */

        const monthRevenue =
            document.getElementById(
                "monthRevenue"
            );

        if (monthRevenue) {

            monthRevenue.textContent =
                "₹" +
                Number(
                    data.monthRevenue ?? 0
                ).toLocaleString("en-IN");

        }


        /* =================================================
           CREATE SALES CHART
        ================================================= */

        createSalesChart(
            data.salesOverview || []
        );
updateSalesRevenueChanges(
    data.salesOverview || [],
    data.previousMonthRevenue ?? 0
);
/* =================================================
   ORDER STATUS COUNTS
================================================= */

const orderStatus =
    data.orderStatus || {};


/* Placed */

const placedOrders =
    document.getElementById(
        "placedOrders"
    );

if (placedOrders) {

    placedOrders.textContent =
        orderStatus.Placed ?? 0;

}


/* Processing */

const processingOrders =
    document.getElementById(
        "processingOrders"
    );

if (processingOrders) {

    processingOrders.textContent =
        orderStatus.Processing ?? 0;

}


/* Shipped */

const shippedOrders =
    document.getElementById(
        "shippedOrders"
    );

if (shippedOrders) {

    shippedOrders.textContent =
        orderStatus.Shipped ?? 0;

}


/* Delivered */

const deliveredOrders =
    document.getElementById(
        "deliveredOrders"
    );

if (deliveredOrders) {

    deliveredOrders.textContent =
        orderStatus.Delivered ?? 0;

}


/* Cancelled */

const cancelledOrders =
    document.getElementById(
        "cancelledOrders"
    );

if (cancelledOrders) {

    cancelledOrders.textContent =
        orderStatus.Cancelled ?? 0;

}

        /* =================================================
           BEST SELLING PRODUCTS
        ================================================= */

        loadBestSellingProducts(
            data.bestSellingProducts || []
        );
        


        /* =================================================
           INVENTORY ALERTS
        ================================================= */

        loadInventoryAlerts(
            data.lowStockList || [],
            data.outOfStockProducts || 0
        );


        /* =================================================
           RECENT USERS
        ================================================= */

        loadRecentUsers(
            data.recentUsers || []
        );

        console.log(
            "Dashboard data:",
            data
        );

    }

    catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

}


/* =========================================================
   SALES OVERVIEW CHART
========================================================= */

let salesChartInstance = null;


function createSalesChart(salesData) {

    const canvas =
        document.getElementById(
            "salesChart"
        );

    if (!canvas) {
        return;
    }


    /* Make sure Chart.js is loaded */

    if (typeof Chart === "undefined") {

        console.error(
            "Chart.js is not loaded."
        );

        return;

    }


    const ctx =
        canvas.getContext("2d");


    /* Destroy previous chart */

    if (salesChartInstance) {

        salesChartInstance.destroy();

    }


    /* =====================================================
       CHART LABELS
    ===================================================== */

    const labels =
        salesData.map(day => {

            const date =
                new Date(day.date);

            return date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short"
                }
            );

        });


    /* =====================================================
       REVENUE DATA
    ===================================================== */

    const revenueData =
        salesData.map(day =>
            Number(day.revenue || 0)
        );


    /* =====================================================
       ORDERS DATA
    ===================================================== */

    const ordersData =
        salesData.map(day =>
            Number(day.orders || 0)
        );


    /* =====================================================
       CREATE CHART
    ===================================================== */

    salesChartInstance =
        new Chart(
            ctx,
            {

                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {
                            label: "Revenue",

                            data: revenueData,

                            borderWidth: 3,

                            tension: 0.4,

                            fill: false,

                            yAxisID:
                                "revenueAxis"
                        },

                        {
                            label: "Orders",

                            data: ordersData,

                            borderWidth: 3,

                            tension: 0.4,

                            fill: false,

                            yAxisID:
                                "ordersAxis"
                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,


                    interaction: {

                        mode: "index",

                        intersect: false

                    },


                    plugins: {

                        legend: {

                            display: false

                        },


                        tooltip: {

                            callbacks: {

                                label:
                                    function(context) {

                                        if (
                                            context.dataset.label ===
                                            "Revenue"
                                        ) {

                                            return (
                                                " Revenue: ₹" +
                                                Number(
                                                    context.raw
                                                ).toLocaleString(
                                                    "en-IN"
                                                )
                                            );

                                        }


                                        return (
                                            " Orders: " +
                                            context.raw
                                        );

                                    }

                            }

                        }

                    },


                    scales: {

                        revenueAxis: {

                            type: "linear",

                            position: "left",

                            beginAtZero: true,


                            ticks: {

                                callback:
                                    function(value) {

                                        return (
                                            "₹" +
                                            Number(
                                                value
                                            ).toLocaleString(
                                                "en-IN"
                                            )
                                        );

                                    }

                            }

                        },


                        ordersAxis: {

                            type: "linear",

                            position: "right",

                            beginAtZero: true,


                            ticks: {

                                precision: 0

                            },


                            grid: {

                                drawOnChartArea:
                                    false

                            }

                        }

                    }

                }

            }
        );

}


/* =========================================================
   CATEGORY-WISE PRODUCT QUANTITY
========================================================= */

async function loadCategoryProductCounts() {

    const categoryGrid =
        document.getElementById(
            "categoryProductGrid"
        );

    if (!categoryGrid) {
        return;
    }


    try {
const response = await fetch(
    "https://botanical-bliss-52ra.onrender.com/api/products"
);
        


        if (!response.ok) {

            throw new Error(
                "Failed to fetch products."
            );

        }


        const products =
            await response.json();


        /* =================================================
           COUNT PRODUCTS BY CATEGORY
        ================================================= */

        const categoryCounts = {};


        products.forEach(product => {

            const category =
                product.category ||
                "Other";


            if (!categoryCounts[category]) {

                categoryCounts[category] = 0;

            }


            categoryCounts[category]++;

        });


        /* =================================================
           NO PRODUCTS
        ================================================= */

        if (
            Object.keys(categoryCounts).length === 0
        ) {

            categoryGrid.innerHTML = `

                <div class="category-empty">

                    <i class="bi bi-box-seam"></i>

                    <strong>
                        No products yet
                    </strong>

                    <span>
                        Add your first product to see
                        category statistics here.
                    </span>

                    <a href="products.html">
                        Add Product
                    </a>

                </div>

            `;

            return;

        }


        /* =================================================
           CATEGORY ICONS
        ================================================= */

        const categoryIcons = {

            "Indoor Plants":
                "bi-flower1",

            "Seeds":
                "bi-flower2",

            "Organic Care":
                "bi-droplet",

            "Gardening Tools":
                "bi-tools"

        };


        /* =================================================
           CREATE CATEGORY CARDS
        ================================================= */

        categoryGrid.innerHTML =

            Object.entries(categoryCounts)

                .map(
                    ([category, count]) => {

                        const icon =
                            categoryIcons[category] ||
                            "bi-box-seam";


                        return `

                            <div
    class="category-product-card"
    onclick="openCategoryProducts('${escapeHTML(category)}')"
    style="cursor: pointer;"
>

                                <div
                                    class="category-card-icon"
                                >

                                    <i
                                        class="bi ${icon}"
                                    ></i>

                                </div>


                                <div
                                    class="category-card-content"
                                >

                                    <span>
                                        ${escapeHTML(category)}
                                    </span>

                                    <strong>
                                        ${count}
                                    </strong>

                                    <small>

                                        ${
                                            count === 1
                                                ? "product"
                                                : "products"
                                        }

                                    </small>

                                </div>


                                <a
                                    href="../shop.html?category=${encodeURIComponent(category)}"
                                    class="category-arrow"
                                    title="View category"
                                >

                                    <i
                                        class="bi bi-arrow-up-right"
                                    ></i>

                                </a>

                            </div>

                        `;

                    }
                )

                .join("");


    }

    catch (error) {

        console.error(
            "Category products error:",
            error
        );


        categoryGrid.innerHTML = `

            <div class="category-error">

                <i
                    class="bi bi-exclamation-circle"
                ></i>

                <span>
                    Unable to load product categories.
                </span>

            </div>

        `;

    }

}


/* =========================================================
   RECENT ORDERS
========================================================= */

async function loadRecentOrders() {

    try {

        const token =
            localStorage.getItem("token");

        if (!token) {
            return;
        }
const response = await fetch(
    "https://botanical-bliss-52ra.onrender.com/api/admin/recent-orders",
            {
                headers: {
                    Authorization:
                        "Bearer " + token
                }
            }
        );

        const orders =
            await response.json();

        if (!response.ok) {

            console.error(
                "Failed to load recent orders:",
                orders
            );

            return;
        }

        const ordersBody =
            document.getElementById(
                "recentOrdersBody"
            );

        if (!ordersBody) {
            return;
        }

        /* =================================================
           NO ORDERS
        ================================================= */

        if (!orders.length) {

            ordersBody.innerHTML = `
                <tr>
                    <td
                        colspan="5"
                        class="orders-empty"
                    >
                        <i class="bi bi-cart-x"></i>

                        <span>
                            No orders found.
                        </span>
                    </td>
                </tr>
            `;

            return;
        }

        /* =================================================
           DISPLAY ORDERS
        ================================================= */

        ordersBody.innerHTML =
            orders.map(order => {

                const date =
                    new Date(
                        order.orderDate
                    );

                const formattedDate =
                    date.toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }
                    );

                const customerName =
                    order.customer?.fullName ||
                    "Unknown";

                const status =
                    order.status ||
                    "Placed";

                return `
                    <tr
                        class="recent-order-row"
                        onclick="openRecentOrder('${escapeHTML(
                            order.orderId || ""
                        )}')"
                        style="cursor: pointer;"
                    >

                        <td>
                            <strong>
                                ${escapeHTML(
                                    order.orderId ||
                                    "N/A"
                                )}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(
                                customerName
                            )}
                        </td>

                        <td>
                            ₹${Number(
                                order.totalAmount || 0
                            ).toLocaleString(
                                "en-IN"
                            )}
                        </td>

                        <td>
                            <span
                                class="order-status ${String(
                                    status
                                ).toLowerCase()}"
                            >
                                ${escapeHTML(status)}
                            </span>
                        </td>

                        <td>
                            ${formattedDate}
                        </td>

                    </tr>
                `;

            })
            .join("");

    }
    catch (error) {

        console.error(
            "Recent orders error:",
            error
        );

    }
}

/* =========================================================
   BEST SELLING PRODUCTS
========================================================= */

function loadBestSellingProducts(products) {

    const container =
        document.getElementById(
            "bestSellingProducts"
        );

    if (!container) {
        return;
    }


    /* -----------------------------------------------------
       NO SALES
    ----------------------------------------------------- */

    if (!Array.isArray(products) || !products.length) {

        container.innerHTML = `

            <div class="dashboard-empty">

                <i class="bi bi-bar-chart"></i>

                <strong>
                    No sales data yet
                </strong>

                <span>
                    Best selling products will appear
                    here after orders are placed.
                </span>

            </div>

        `;

        return;
    }


    /* -----------------------------------------------------
       FIND HIGHEST UNITS SOLD
       Used to calculate the progress bar width.
    ----------------------------------------------------- */

    const maxUnitsSold =
        Math.max(
            ...products.map(product =>
                Number(product.unitsSold || 0)
            ),
            1
        );


    /* -----------------------------------------------------
       DISPLAY PRODUCTS
    ----------------------------------------------------- */

    container.innerHTML = products

        .map((product, index) => {

            const productImage =
                product.image &&
                String(product.image).trim()
                    ? "../" +
                      String(product.image).trim()
                    : "";


            const unitsSold =
                Number(
                    product.unitsSold || 0
                );


            const revenue =
                Number(
                    product.revenue || 0
                );


            const salesPercentage =
                Math.round(
                    (unitsSold / maxUnitsSold) * 100
                );


            return `

                <div
                    class="best-selling-item"
                    onclick="openBestSellingProduct('${escapeHTML(product._id || "")}')"
                    style="cursor: pointer;"
                >


                    <!-- RANK -->

                    <div class="best-selling-rank">

                        ${index + 1}

                    </div>


                    <!-- PRODUCT IMAGE -->

                    <div class="best-selling-image">

                        ${
                            productImage

                                ? `

                                    <img
                                        src="${escapeHTML(productImage)}"
                                        alt="${escapeHTML(product.name || "Product")}"
                                        loading="lazy"
                                        onerror="
                                            this.style.display='none';
                                            this.parentElement.classList.add('image-error');
                                        "
                                    >

                                  `

                                : `

                                    <div
                                        class="best-selling-no-image"
                                    >

                                        <i
                                            class="bi bi-flower1"
                                        ></i>

                                    </div>

                                  `
                        }

                    </div>


                    <!-- PRODUCT INFORMATION -->

                    <div class="best-selling-info">

                        <strong>

                            ${escapeHTML(
                                product.name ||
                                "Unnamed Product"
                            )}

                        </strong>


                        <span>

                            ${unitsSold.toLocaleString(
                                "en-IN"
                            )}

                            units sold

                        </span>


                        <!-- SALES PERFORMANCE BAR -->

                        <div
                            class="best-selling-progress"
                        >

                            <div
                                class="best-selling-progress-fill"
                                style="
                                    width: ${salesPercentage}%;
                                "
                            ></div>

                        </div>

                    </div>


                    <!-- REVENUE -->

                    <div
                        class="best-selling-revenue"
                    >

                        <strong>

                            ₹${revenue.toLocaleString(
                                "en-IN"
                            )}

                        </strong>

                        <span>

                            Revenue

                        </span>

                    </div>


                </div>

            `;

        })

        .join("");

}

 /* =========================================================
    INVENTORY ALERTS
 ========================================================= */

 function loadInventoryAlerts(

     products,

     outOfStockCount

 ) {

     const container =
         document.getElementById(
             "inventoryAlerts"
         );

     if (!container) {
         return;
     }


     /* -----------------------------------------------------
        PREPARE COUNTS
     ----------------------------------------------------- */

     const lowStockCount =
         Array.isArray(products)
             ? products.filter(product =>
                 Number(product.stock || 0) > 0
             ).length
             : 0;


     const outOfStock =
         Number(
             outOfStockCount || 0
         );


     const totalAlerts =
         lowStockCount +
         outOfStock;


     /* -----------------------------------------------------
        NO INVENTORY ALERTS
     ----------------------------------------------------- */

     if (
         !Array.isArray(products) ||
         products.length === 0
     ) {

         container.innerHTML = `

             <div class="inventory-summary">

                 <div class="inventory-summary-item">

                     <div class="inventory-summary-icon">
                         <i class="bi bi-check-circle"></i>
                     </div>

                     <div>
                         <strong>
                             Inventory looks good
                         </strong>

                         <span>
                             No products currently need
                             immediate restocking.
                         </span>
                     </div>

                 </div>

             </div>


             <div class="dashboard-empty success-empty">

                 <i class="bi bi-box-seam"></i>

                 <strong>
                     All stock levels are healthy
                 </strong>

                 <span>
                     Your current products have
                     sufficient inventory.
                 </span>

             </div>

         `;

         return;
     }


     /* -----------------------------------------------------
        INVENTORY SUMMARY
     ----------------------------------------------------- */

     const summaryHTML = `

         <div class="inventory-summary">

             <div class="inventory-summary-item">

                 <div class="inventory-summary-icon warning-icon">

                     <i class="bi bi-exclamation-triangle"></i>

                 </div>

                 <div>

                     <strong>
                         ${lowStockCount}
                     </strong>

                     <span>
                         Low stock
                     </span>

                 </div>

             </div>


             <div class="inventory-summary-item">

                 <div class="inventory-summary-icon danger-icon">

                     <i class="bi bi-x-circle"></i>

                 </div>

                 <div>

                     <strong>
                         ${outOfStock}
                     </strong>

                     <span>
                         Out of stock
                     </span>

                 </div>

             </div>


             <div class="inventory-alert-total">

                 <strong>
                     ${totalAlerts}
                 </strong>

                 <span>
                     ${totalAlerts === 1
                         ? "product needs attention"
                         : "products need attention"}
                 </span>

             </div>

         </div>

     `;


     /* -----------------------------------------------------
        DISPLAY INVENTORY ALERTS
     ----------------------------------------------------- */

     const alertsHTML = products

         .map(product => {

             const stock =
                 Number(
                     product.stock || 0
                 );


             const isOutOfStock =
                 stock <= 0;


             return `

                 <div

                     class="inventory-alert-item
                     ${isOutOfStock
                         ? "inventory-danger"
                         : "inventory-warning"}"

                     onclick="openInventoryProduct('${escapeHTML(product._id || "")}')"

                     style="cursor: pointer;"

                 >

                     <!-- ALERT ICON -->

                     <div class="inventory-alert-icon">

                         <i class="bi ${
                             isOutOfStock
                                 ? "bi-x-circle"
                                 : "bi-exclamation-triangle"
                         }"></i>

                     </div>


                     <!-- PRODUCT INFORMATION -->

                     <div class="inventory-alert-info">

                         <strong>

                             ${escapeHTML(
                                 product.name ||
                                 "Unnamed Product"
                             )}

                         </strong>

                         <span>

                             ${escapeHTML(
                                 product.category ||
                                 "Product"
                             )}

                         </span>

                     </div>


                     <!-- STOCK -->

                     <div class="inventory-stock">

                         <strong>

                             ${stock}

                         </strong>

                         <span>

                             ${
                                 isOutOfStock
                                     ? "Out of stock"
                                     : "units left"
                             }

                         </span>

                     </div>


                     <!-- ACTION -->

                     <div

                         class="inventory-action"

                         title="Edit product"

                     >

                         <i class="bi bi-arrow-up-right"></i>

                     </div>

                 </div>

             `;

         })

         .join("");


     container.innerHTML =
         summaryHTML +
         alertsHTML;

 }

/* =========================================================
   RECENT USERS
========================================================= */

function loadRecentUsers(users) {

    const usersBody =
        document.getElementById(
            "recentUsersBody"
        );

    if (!usersBody) {
        return;
    }


    /* -----------------------------------------------------
       NO USERS
    ----------------------------------------------------- */

    if (!users.length) {

        usersBody.innerHTML = `
            <tr>

                <td
                    colspan="5"
                    class="users-empty"
                >

                    <i class="bi bi-people"></i>

                    <span>
                        No registered users found.
                    </span>

                </td>

            </tr>
        `;

        return;
    }


    /* -----------------------------------------------------
       DISPLAY USERS
    ----------------------------------------------------- */

    usersBody.innerHTML = users
        .map(user => {

            const date =
                user.createdAt
                    ? new Date(user.createdAt)
                    : null;


            const formattedDate =
                date
                    ? date.toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }
                    )
                    : "N/A";


            const role =
                user.role || "user";


            return `
                <tr>

                    <td>

                        <div class="dashboard-user">

                            <div class="dashboard-user-avatar">

                                <i class="bi bi-person"></i>

                            </div>

                            <strong>
                                ${escapeHTML(
                                    user.name ||
                                    "Unknown User"
                                )}
                            </strong>

                        </div>

                    </td>


                    <td>
                        ${escapeHTML(
                            user.email ||
                            "No email"
                        )}
                    </td>


                    <td>

                        <span
                            class="user-role
                            ${
                                role === "admin"
                                    ? "admin-role"
                                    : "customer-role"
                            }"
                        >
                            ${escapeHTML(role)}
                        </span>

                    </td>


                    <td>
                        ${formattedDate}
                    </td>

<td>
    <button
        type="button"
        class="user-view-action"
        onclick="openRecentUser('${escapeHTML(user._id || "")}')"
        title="View user"
    >
        <i class="bi bi-arrow-up-right"></i>
    </button>
</td>

                </tr>
            `;

        })
        .join("");
}

/* =========================================================
   QUICK ACTIONS
========================================================= */

function setupQuickActions() {

    const quickCards =
        document.querySelectorAll(
            ".quick-card"
        );


    if (quickCards.length < 3) {
        return;
    }


    /* Add Product */

    quickCards[0].addEventListener(
        "click",
        () => {

            window.location.href =
                "products.html";

        }
    );


    /* Manage Orders */

    quickCards[1].addEventListener(
        "click",
        () => {

            window.location.href =
                "orders.html";

        }
    );


    /* View Users */

    quickCards[2].addEventListener(
        "click",
        () => {

            window.location.href =
                "users.html";

        }
    );

}



function updateSalesLastUpdated() {

    const lastUpdated =
        document.getElementById("salesLastUpdated");

    if (!lastUpdated) {
        return;
    }

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    lastUpdated.textContent =
        `Last updated: ${time}`;
}
function updateSalesRevenueChanges(
    salesOverview,
    previousMonthRevenue
) {

    /* ---------------------------------------------
       CHECK SALES DATA
    --------------------------------------------- */

    if (
        !Array.isArray(salesOverview) ||
        salesOverview.length < 2
    ) {
        return;
    }


    /* ---------------------------------------------
       GET TODAY AND YESTERDAY
    --------------------------------------------- */

    const todayData =
        salesOverview[salesOverview.length - 1];

    const yesterdayData =
        salesOverview[salesOverview.length - 2];


    const todayRevenue =
        Number(todayData?.revenue ?? 0);

    const yesterdayRevenue =
        Number(yesterdayData?.revenue ?? 0);


    /* ---------------------------------------------
       TODAY CHANGE ELEMENT
    --------------------------------------------- */

    const todayChange =
        document.getElementById(
            "todayRevenueChange"
        );


    if (todayChange) {

        /* RESET CLASSES */

        todayChange.classList.remove(
            "positive",
            "negative",
            "neutral"
        );


        /* -----------------------------------------
           BOTH VALUES ARE ZERO
        ----------------------------------------- */

        if (
            todayRevenue === 0 &&
            yesterdayRevenue === 0
        ) {

            todayChange.classList.add(
                "neutral"
            );

            todayChange.innerHTML =
                `<i class="bi bi-dash"></i>
                 No change from yesterday`;

        }


        /* -----------------------------------------
           YESTERDAY WAS ZERO
        ----------------------------------------- */

        else if (
            yesterdayRevenue === 0
        ) {

            todayChange.classList.add(
                "positive"
            );

            todayChange.innerHTML =
                `<i class="bi bi-arrow-up"></i>
                 New revenue today`;

        }


        /* -----------------------------------------
           CALCULATE PERCENTAGE
        ----------------------------------------- */

        else {

            const change =
                (
                    (
                        todayRevenue -
                        yesterdayRevenue
                    ) /
                    yesterdayRevenue
                ) * 100;


            const roundedChange =
                Math.abs(change).toFixed(1);


            if (change > 0) {

                todayChange.classList.add(
                    "positive"
                );

                todayChange.innerHTML =
                    `<i class="bi bi-arrow-up"></i>
                     ${roundedChange}% vs yesterday`;

            }

            else if (change < 0) {

                todayChange.classList.add(
                    "negative"
                );

                todayChange.innerHTML =
                    `<i class="bi bi-arrow-down"></i>
                     ${roundedChange}% vs yesterday`;

            }

            else {

                todayChange.classList.add(
                    "neutral"
                );

                todayChange.innerHTML =
                    `<i class="bi bi-dash"></i>
                     No change from yesterday`;

            }

        }

    }


    /* ---------------------------------------------
   MONTH REVENUE COMPARISON
--------------------------------------------- */

const monthChange =
    document.getElementById(
        "monthRevenueChange"
    );


if (monthChange) {

    const currentMonthRevenue =
        Number(
            document.getElementById(
                "monthRevenue"
            )?.textContent
                .replace(/[₹,]/g, "")
                || 0
        );

const previousMonthRevenueValue =
    Number(
        previousMonthRevenue ?? 0
    );


    /* RESET CLASSES */

    monthChange.classList.remove(
        "positive",
        "negative",
        "neutral"
    );


    /* -----------------------------------------
       BOTH MONTHS ARE ZERO
    ----------------------------------------- */

    if (
        currentMonthRevenue === 0 &&
        previousMonthRevenue === 0
    ) {

        monthChange.classList.add(
            "neutral"
        );

        monthChange.innerHTML =
            `<i class="bi bi-dash"></i>
             No change from last month`;

    }


    /* -----------------------------------------
       PREVIOUS MONTH WAS ZERO
    ----------------------------------------- */

    else if (
        previousMonthRevenue === 0
    ) {

        monthChange.classList.add(
            "positive"
        );

        monthChange.innerHTML =
            `<i class="bi bi-arrow-up"></i>
             New revenue this month`;

    }


    /* -----------------------------------------
       CALCULATE PERCENTAGE
    ----------------------------------------- */

    else {

        const change =
            (
                (
                    currentMonthRevenue -
                    previousMonthRevenue
                ) /
                previousMonthRevenue
            ) * 100;


        const roundedChange =
            Math.abs(change).toFixed(1);


        if (change > 0) {

            monthChange.classList.add(
                "positive"
            );

            monthChange.innerHTML =
                `<i class="bi bi-arrow-up"></i>
                 ${roundedChange}% vs last month`;

        }

        else if (change < 0) {

            monthChange.classList.add(
                "negative"
            );

            monthChange.innerHTML =
                `<i class="bi bi-arrow-down"></i>
                 ${roundedChange}% vs last month`;

        }

        else {

            monthChange.classList.add(
                "neutral"
            );

            monthChange.innerHTML =
                `<i class="bi bi-dash"></i>
                 No change from last month`;

        }

    }

}
}

function setupSalesPeriodSelector() {

    const buttons = document.querySelectorAll(
        ".sales-period-btn"
    );

    if (!buttons.length) {
        return;
    }

    buttons.forEach(button => {

        button.addEventListener("click", async () => {

            const period =
                button.dataset.period;

            /* ---------------------------------------------
               UPDATE ACTIVE BUTTON
            --------------------------------------------- */

            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            /* ---------------------------------------------
               UPDATE DESCRIPTION
            --------------------------------------------- */

            const description =
                document.getElementById(
                    "salesOverviewDescription"
                );

            if (description) {

                if (period === "7days") {

                    description.textContent =
                        "Track your store sales and order activity for the last 7 days.";

                }

                else if (period === "30days") {

                    description.textContent =
                        "Track your store sales and order activity for the last 30 days.";

                }

                else if (period === "3months") {

                    description.textContent =
                        "Track your store sales and order activity for the last 3 months.";

                }
            }


            /* ---------------------------------------------
               UPDATE CHART PERIOD LABEL
            --------------------------------------------- */

            const chartPeriod =
                document.getElementById("salesChartPeriod");

            if (chartPeriod) {

                if (period === "7days") {

                    chartPeriod.textContent =
                        "Last 7 days";

                }

                else if (period === "30days") {

                    chartPeriod.textContent =
                        "Last 30 days";

                }

                else if (period === "3months") {

                    chartPeriod.textContent =
                        "Last 3 months";

                }
            }


            /* ---------------------------------------------
               SHOW SALES CHART LOADING
            --------------------------------------------- */

            const salesChartLoading =
                document.getElementById("salesChartLoading");

            if (salesChartLoading) {
                salesChartLoading.style.display = "flex";
            }


            /* ---------------------------------------------
               LOAD SELECTED PERIOD
            --------------------------------------------- */

            try {

                await loadDashboardStats(period);

            }

            finally {

    if (salesChartLoading) {
        salesChartLoading.style.display = "none";
    }

    updateSalesLastUpdated();

}

        });

    });

}
/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text ?? "";


    return div.innerHTML;

}

/* =========================================================
   OPEN BEST SELLING PRODUCT
========================================================= */
function openBestSellingProduct(productId) {

    if (!productId) {
        console.warn("Best selling product does not have a valid ID.");
        return;
    }

    sessionStorage.setItem(
        "editProductId",
        productId
    );

    window.location.href = "products.html";
}

/* =========================================================
   OPEN RECENT USER
========================================================= */

function openRecentUser(userId) {

    if (!userId) {

        console.warn(
            "Recent user does not have a valid ID."
        );

        return;
    }

    sessionStorage.setItem(
        "viewUserId",
        userId
    );

    window.location.href =
        "users.html";
}

/* =========================================================
   OPEN RECENT ORDER
========================================================= */

function openRecentOrder(orderId) {

    if (!orderId) {

        console.warn(
            "Recent order does not have a valid ID."
        );

        return;
    }

    sessionStorage.setItem(
        "viewOrderId",
        orderId
    );

    window.location.href =
        "orders.html";
}

/* =========================================================
   OPEN CATEGORY PRODUCTS
========================================================= */

function openCategoryProducts(category) {

    if (!category) {
        console.warn(
            "Category does not have a valid name."
        );
        return;
    }

    window.location.href =
        "../shop.html?category=" +
        encodeURIComponent(category);
}
/* =========================================================
   LOGOUT
========================================================= */

const adminLogout =
    document.getElementById(
        "adminLogout"
    );


if (adminLogout) {

    adminLogout.addEventListener(
        "click",
        () => {

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            window.location.href =
                "../login.html";

        }
    );

}

