
/* =========================
   BOTANICAL BLISS - MY ORDERS
   MongoDB Based Orders
========================= */


/* =========================
   API URL
========================= */

const ORDERS_API_URL =
    "http://localhost:5000/api/orders";


/* =========================
   CURRENT USER
========================= */

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("user")
    ) || null;

}


/* =========================
   GET JWT TOKEN
========================= */

function getToken() {

    return localStorage.getItem("token");

}


/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    const user =
        getCurrentUser();

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    if (!cartCount) {
        return;
    }


    if (!user) {

        cartCount.textContent =
            "0";

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
            localStorage.getItem(
                cartKey
            )
        ) || [];


    let totalItems = 0;


    cart.forEach(function(item) {

        totalItems +=
            Number(
                item.quantity || 0
            );

    });


    cartCount.textContent =
        totalItems;

}


/* =========================
   GET ORDERS FROM MONGODB
========================= */

async function getOrders() {

    const token =
        getToken();


    if (!token) {

        return null;

    }


    try {

        const response =
            await fetch(
                `${ORDERS_API_URL}/my-orders`,
                {
                    method: "GET",

                    headers: {

                        "Authorization":
                            `Bearer ${token}`

                    }

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Get orders error:",
                data
            );

            return null;

        }


        return data.orders || [];


    } catch (error) {

        console.error(
            "Orders connection error:",
            error
        );

        return null;

    }

}


/* =========================
   CANCEL ORDER
========================= */

async function cancelOrder(orderId) {

    const token =
        getToken();


    if (!token) {

        alert(
            "Please login again."
        );

        window.location.href =
            "login.html";

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to cancel this order?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `${ORDERS_API_URL}/cancel/${encodeURIComponent(orderId)}`,
                {
                    method: "PUT",

                    headers: {

                        "Authorization":
                            `Bearer ${token}`

                    }

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Unable to cancel the order."
            );

            return;

        }


        alert(
            "Order cancelled successfully."
        );


        displayOrders();


    } catch (error) {

        console.error(
            "Cancel order error:",
            error
        );


        alert(
            "Unable to connect to the server. Please try again."
        );

    }

}


/* =========================
   DISPLAY ORDERS
========================= */

async function displayOrders() {

    const ordersList =
        document.getElementById(
            "ordersList"
        );


    if (!ordersList) {

        return;

    }


    const user =
        getCurrentUser();


    /* =========================
       USER NOT LOGGED IN
    ========================= */

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


    /* =========================
       TOKEN CHECK
    ========================= */

    const token =
        getToken();


    if (!token) {

        ordersList.innerHTML = `

            <div class="empty-orders">

                <i class="bi bi-person-lock"></i>

                <h2>Session Expired</h2>

                <p>
                    Please login again to view your orders.
                </p>

                <a href="login.html">
                    Login
                </a>

            </div>

        `;

        return;

    }


    /* =========================
       LOADING
    ========================= */

    ordersList.innerHTML = `

        <div class="empty-orders">

            <i class="bi bi-arrow-repeat"></i>

            <h2>Loading Orders...</h2>

            <p>
                Please wait while we load your orders.
            </p>

        </div>

    `;


    /* =========================
       GET MONGODB ORDERS
    ========================= */

    const orders =
        await getOrders();


    /* =========================
       SERVER ERROR
    ========================= */

    if (orders === null) {

        ordersList.innerHTML = `

            <div class="empty-orders">

                <i class="bi bi-exclamation-circle"></i>

                <h2>Unable to Load Orders</h2>

                <p>
                    We could not connect to the server.
                    Please make sure the Botanical Bliss server is running.
                </p>

            </div>

        `;

        return;

    }


    /* =========================
       NO ORDERS
    ========================= */

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


    /* =========================
       DISPLAY ORDERS
    ========================= */

    ordersList.innerHTML = "";


    orders.forEach(function(order) {

        let orderTotal = 0;

        let itemsHTML = "";


        /* =========================
           ORDER ITEMS
        ========================= */

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
                        src="${
                            item.image ||
                            "images/default-product.jpg"
                        }"

                        alt="${
                            item.name ||
                            "Product"
                        }"
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


        /* =========================
           ORDER DATE
        ========================= */

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
            order.status ===
            "Cancelled";


        const orderStatus =
            order.status ||
            "Placed";


        /* =========================
           CANCEL BUTTON
        ========================= */

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


        /* =========================
           ORDER CARD
        ========================= */

        const orderElement =
            document.createElement(
                "div"
            );


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
                        ₹${order.totalAmount || orderTotal}
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
