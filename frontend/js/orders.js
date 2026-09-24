/* =========================
   BOTANICAL BLISS - MY ORDERS
   User-Specific Orders
========================= */


/* =========================
   CURRENT USER
========================= */

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("user")
    ) || null;

}


/* =========================
   USER ORDER KEY
========================= */

function getOrderKey() {

    const user = getCurrentUser();

    if (!user) {
        return null;
    }

    const userId =
        user._id ||
        user.id ||
        user.email;

    return `orders_${userId}`;

}


/* =========================
   GET USER-SPECIFIC ORDERS
========================= */

function getOrders() {

    const orderKey = getOrderKey();

    if (!orderKey) {
        return [];
    }

    return JSON.parse(
        localStorage.getItem(orderKey)
    ) || [];

}


/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    const user = getCurrentUser();

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }

    if (!user) {

        cartCount.textContent = "0";

        return;

    }

    const userId =
        user._id ||
        user.id ||
        user.email;

    const cartKey =
        `cart_${userId}`;

    const cart =
        JSON.parse(
            localStorage.getItem(cartKey)
        ) || [];

    let totalItems = 0;

    cart.forEach(function(item) {

        totalItems +=
            Number(item.quantity || 0);

    });

    cartCount.textContent =
        totalItems;

}


/* =========================
   CANCEL ORDER
========================= */

function cancelOrder(orderId) {

    const orderKey =
        getOrderKey();

    if (!orderKey) {
        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to cancel this order?"
        );


    if (!confirmed) {
        return;
    }


    const orders =
        getOrders();


    const orderIndex =
        orders.findIndex(
            function(order) {

                return String(order.orderId) ===
                    String(orderId);

            }
        );


    if (orderIndex === -1) {

        alert("Order could not be found.");

        return;

    }


    /* Change order status */

    orders[orderIndex].status =
        "Cancelled";


    /* Save updated orders */

    localStorage.setItem(
        orderKey,
        JSON.stringify(orders)
    );


    /* Refresh order list */

    displayOrders();

}


/* =========================
   DISPLAY ORDERS
========================= */

function displayOrders() {

    const ordersList =
        document.getElementById(
            "ordersList"
        );

    if (!ordersList) {
        return;
    }


    const user =
        getCurrentUser();


    /* User is not logged in */

    if (!user) {

        ordersList.innerHTML = `

            <div class="empty-orders">

                <i class="bi bi-person-lock"></i>

                <h2>Please Login</h2>

                <p>
                    Please login to view your orders.
                </p>

                <a href="login.html">
                    Login
                </a>

            </div>

        `;

        return;

    }


    const orders =
        getOrders();


    /* No orders */

    if (orders.length === 0) {

        ordersList.innerHTML = `

            <div class="empty-orders">

                <i class="bi bi-bag"></i>

                <h2>No Orders Yet</h2>

                <p>
                    You haven't placed any orders yet.
                </p>

                <a href="shop.html">
                    Start Shopping
                </a>

            </div>

        `;

        return;

    }


    /* Display orders */

    ordersList.innerHTML = "";


    orders.forEach(function(order) {

        let orderTotal = 0;

        let itemsHTML = "";


        order.items.forEach(function(item) {

            const price =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 1;

            const itemTotal =
                price * quantity;

            orderTotal +=
                itemTotal;


            itemsHTML += `

                <div class="order-item-image">

                    <img
                        src="${item.image || 'images/default-product.jpg'}"
                        alt="${item.name || 'Product'}"
                    >

                </div>

                <div class="order-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ₹${price} × ${quantity}
                    </p>

                </div>

                <strong>
                    ₹${itemTotal}
                </strong>

            `;

        });


        const orderDate =
            new Date(
                order.orderDate
            ).toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        /* =========================
           ORDER STATUS
        ========================= */

        const isCancelled =
            order.status === "Cancelled";


        const orderStatus =
            isCancelled
                ? "Cancelled"
                : "Placed";


        const cancelButton =
            isCancelled
                ? ""
                : `

                    <button
                        class="cancel-order-btn"
                        onclick="cancelOrder('${order.orderId}')"
                    >
                        <i class="bi bi-x-circle"></i>
                        Cancel Order
                    </button>

                `;


        const orderElement =
            document.createElement("div");

        orderElement.className =
            "order-card";


        orderElement.innerHTML = `

            <div class="order-header">

                <div>

                    <h3>
                        Order #${order.orderId}
                    </h3>

                    <p>
                        ${orderDate}
                    </p>

                </div>

                <span
                    class="order-status ${
                        isCancelled
                            ? "cancelled"
                            : ""
                    }"
                >
                    ${orderStatus}
                </span>

            </div>


            <div class="order-items">

                ${itemsHTML}

            </div>


            <div class="order-footer">

    <div>

        Payment:

        <strong>
            ${order.paymentMethod}
        </strong>

    </div>

    <div>

        Total:

        <strong>
            ₹${orderTotal}
        </strong>

    </div>

    ${cancelButton}

</div>
        `;


        ordersList.appendChild(
            orderElement
        );

    });

}


/* =========================
   PAGE LOAD
========================= */

updateCartCount();

displayOrders();