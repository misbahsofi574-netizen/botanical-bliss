let currentOrderId = null;
let allOrders = [];


/* =========================================================
   PAGE LOAD
========================================================= */
document.addEventListener(
    "DOMContentLoaded",
    async () => {

        setupLogout();

        setupOrderControls();

        setupModalControls();

        await loadAllOrders();


        /* =================================================
           OPEN ORDER FROM ADMIN DASHBOARD
        ================================================= */

        const viewOrderId =
            sessionStorage.getItem(
                "viewOrderId"
            );

        if (viewOrderId) {

            sessionStorage.removeItem(
                "viewOrderId"
            );

            viewOrder(viewOrderId);
        }

    }
);


/* =========================================================
   LOAD ALL ORDERS
========================================================= */

async function loadAllOrders() {

    const ordersBody =
        document.getElementById("ordersBody");

    try {

        const token =
            localStorage.getItem("token");

        if (!token) {

            window.location.href =
                "../login.html";

            return;
        }


        /* Loading state */

        if (ordersBody) {

            ordersBody.innerHTML = `
                <tr>
                    <td
                        colspan="7"
                        class="orders-loading"
                    >
                        <i class="bi bi-arrow-repeat"></i>
                        Loading orders...
                    </td>
                </tr>
            `;

        }


        const response = await fetch(
            "http://localhost:5000/api/admin/orders",
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
                "Failed to load orders:",
                orders
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


        allOrders = Array.isArray(orders)
            ? orders
            : [];


        updateOrdersCount();


        renderOrders();


    } catch (error) {

        console.error(
            "Orders error:",
            error
        );


        if (ordersBody) {

            ordersBody.innerHTML = `
                <tr>
                    <td
                        colspan="7"
                        class="orders-empty"
                    >
                        <i class="bi bi-exclamation-circle"></i>

                        <span>
                            Unable to load orders.
                        </span>

                        <button
                            type="button"
                            onclick="loadAllOrders()"
                            class="retry-orders-btn"
                        >
                            Try Again
                        </button>

                    </td>
                </tr>
            `;

        }

    }

}


/* =========================================================
   RENDER ORDERS
========================================================= */

function renderOrders() {

    const ordersBody =
        document.getElementById("ordersBody");

    if (!ordersBody) {
        return;
    }


    const searchInput =
        document.getElementById(
            "orderSearchInput"
        );

    const statusFilter =
        document.getElementById(
            "orderStatusFilter"
        );


    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    /* -----------------------------------------------------
       FILTER ORDERS
    ----------------------------------------------------- */

    const filteredOrders =
        allOrders.filter(order => {

            const orderId =
                String(
                    order.orderId || ""
                ).toLowerCase();


            const customerName =
                String(
                    order.customer?.fullName || ""
                ).toLowerCase();


            const matchesSearch =
                !searchText ||
                orderId.includes(searchText) ||
                customerName.includes(searchText);


            const matchesStatus =
                selectedStatus === "all" ||
                order.status === selectedStatus;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    /* -----------------------------------------------------
       NO RESULTS
    ----------------------------------------------------- */

    if (!filteredOrders.length) {

        ordersBody.innerHTML = `
            <tr>

                <td
                    colspan="7"
                    class="orders-empty"
                >

                    <i class="bi bi-search"></i>

                    <strong>
                        No orders found
                    </strong>

                    <span>
                        Try changing your search
                        or status filter.
                    </span>

                </td>

            </tr>
        `;

        return;
    }


    /* -----------------------------------------------------
       DISPLAY ORDERS
    ----------------------------------------------------- */

    ordersBody.innerHTML =
        filteredOrders
            .map(order => {

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
                    "Unknown Customer";


                const status =
                    order.status ||
                    "Placed";


                const paymentMethod =
                    order.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : "Online";


                return `

                    <tr>

                        <!-- ORDER ID -->

                        <td>

                            <strong>
                                ${escapeHTML(
                                    order.orderId || "N/A"
                                )}
                            </strong>

                        </td>


                        <!-- CUSTOMER -->

                        <td>

                            ${escapeHTML(
                                customerName
                            )}

                        </td>


                        <!-- AMOUNT -->

                        <td>

                            ₹${Number(
                                order.totalAmount || 0
                            ).toLocaleString("en-IN")}

                        </td>


                        <!-- PAYMENT -->

                        <td>

                            ${escapeHTML(
                                paymentMethod
                            )}

                        </td>


                        <!-- STATUS -->

                        <td>

                            <span
                                class="order-status ${String(
                                    status
                                ).toLowerCase()}"
                            >

                                ${escapeHTML(
                                    status
                                )}

                            </span>

                        </td>


                        <!-- DATE -->

                        <td>

                            ${formattedDate}

                        </td>


                        <!-- ACTION -->

                        <td>

                            <button
                                type="button"
                                class="order-action-btn"
                                onclick="viewOrder('${escapeHTML(
                                    order.orderId || ""
                                )}')"
                            >

                                <i class="bi bi-eye"></i>

                                View

                            </button>

                        </td>

                    </tr>

                `;

            })
            .join("");

}


/* =========================================================
   UPDATE ORDER COUNT
========================================================= */

function updateOrdersCount() {

    const countElement =
        document.getElementById(
            "ordersCount"
        );


    if (!countElement) {
        return;
    }


    countElement.textContent =
        allOrders.length;

}


/* =========================================================
   SEARCH + FILTER + REFRESH
========================================================= */

function setupOrderControls() {

    const searchInput =
        document.getElementById(
            "orderSearchInput"
        );


    const statusFilter =
        document.getElementById(
            "orderStatusFilter"
        );


    const refreshButton =
        document.getElementById(
            "refreshOrdersBtn"
        );


    /* Search */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                renderOrders();

            }
        );

    }


    /* Status filter */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            () => {

                renderOrders();

            }
        );

    }


    /* Refresh */

    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            async () => {

                refreshButton.disabled =
                    true;

                refreshButton.innerHTML = `
                    <i class="bi bi-arrow-repeat"></i>
                    Refreshing...
                `;


                await loadAllOrders();


                refreshButton.disabled =
                    false;

                refreshButton.innerHTML = `
                    <i class="bi bi-arrow-clockwise"></i>
                    Refresh
                `;

            }
        );

    }

}


/* =========================================================
   VIEW ORDER DETAILS
========================================================= */

async function viewOrder(orderId) {

    try {

        currentOrderId =
            orderId;


        const token =
            localStorage.getItem("token");


        if (!token) {

            window.location.href =
                "../login.html";

            return;
        }


        const response =
            await fetch(
                "http://localhost:5000/api/admin/orders/" +
                encodeURIComponent(orderId),
                {
                    headers: {
                        Authorization:
                            "Bearer " + token
                    }
                }
            );


        const order =
            await response.json();


        if (!response.ok) {

            alert(
                order.message ||
                "Unable to load order details."
            );

            return;
        }


        /* -------------------------------------------------
           ORDER ID
        ------------------------------------------------- */

        document.getElementById(
            "modalOrderId"
        ).textContent =
            order.orderId || "Order";


        /* -------------------------------------------------
           CUSTOMER INFORMATION
        ------------------------------------------------- */

        const customer =
            order.customer || {};


        document.getElementById(
            "modalCustomerName"
        ).textContent =
            customer.fullName || "—";


        document.getElementById(
            "modalCustomerEmail"
        ).textContent =
            customer.email || "—";


        document.getElementById(
            "modalCustomerPhone"
        ).textContent =
            customer.phone || "—";


        document.getElementById(
            "modalCustomerCity"
        ).textContent =
            customer.city || "—";


        document.getElementById(
            "modalCustomerAddress"
        ).textContent =
            customer.address || "—";


        document.getElementById(
            "modalCustomerPincode"
        ).textContent =
            customer.pincode || "—";


        /* -------------------------------------------------
           PAYMENT INFORMATION
        ------------------------------------------------- */

        document.getElementById(
            "modalPaymentMethod"
        ).textContent =
            order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Online";


        document.getElementById(
            "modalPaymentStatus"
        ).textContent =
            order.paymentStatus || "—";


        document.getElementById(
            "modalTotalAmount"
        ).textContent =
            "₹" +
            Number(
                order.totalAmount || 0
            ).toLocaleString("en-IN");


        /* -------------------------------------------------
           ORDER STATUS
        ------------------------------------------------- */

        const currentStatus =
            order.status || "Placed";


        document.getElementById(
            "modalOrderStatus"
        ).textContent =
            currentStatus;

            updateOrderTimeline(currentStatus);


        document.getElementById(
            "orderStatusSelect"
        ).value =
            currentStatus;


        /* -------------------------------------------------
           ORDER ITEMS
        ------------------------------------------------- */

        const itemsContainer =
            document.getElementById(
                "modalOrderItems"
            );


        const items =
            Array.isArray(order.items)
                ? order.items
                : [];


        if (!items.length) {

            itemsContainer.innerHTML = `
                <div class="modal-no-items">
                    No products found for this order.
                </div>
            `;

        } else {

            itemsContainer.innerHTML =
                items
                    .map(item => {

                        const quantity =
                            Number(
                                item.quantity || 0
                            );


                        const price =
                            Number(
                                item.price || 0
                            );


                        return `

                            <div class="modal-order-item">

                                <div
                                    class="modal-order-item-info"
                                >

                                    <strong>
                                        ${escapeHTML(
                                            item.name ||
                                            "Product"
                                        )}
                                    </strong>

                                    <span>
                                        ₹${price.toLocaleString(
                                            "en-IN"
                                        )}
                                        ×
                                        ${quantity}
                                    </span>

                                </div>


                                <div
                                    class="modal-order-item-price"
                                >

                                    ₹${(
                                        price *
                                        quantity
                                    ).toLocaleString(
                                        "en-IN"
                                    )}

                                </div>

                            </div>

                        `;

                    })
                    .join("");

        }


        /* -------------------------------------------------
           CLEAR OLD MESSAGE
        ------------------------------------------------- */

        const message =
            document.getElementById(
                "statusUpdateMessage"
            );


        if (message) {

            message.textContent = "";

            message.className =
                "status-update-message";

        }


        /* -------------------------------------------------
           SHOW MODAL
        ------------------------------------------------- */

        document
            .getElementById("orderModal")
            .classList.add("show");


    } catch (error) {

        console.error(
            "Order details error:",
            error
        );


        alert(
            "Something went wrong while loading the order."
        );

    }

}


/* =========================================================
   UPDATE ORDER STATUS
========================================================= */

async function updateOrderStatus() {

    try {

        if (!currentOrderId) {
            return;
        }


        const token =
            localStorage.getItem("token");


        if (!token) {

            window.location.href =
                "../login.html";

            return;
        }


        const selectedStatus =
            document.getElementById(
                "orderStatusSelect"
            ).value;


        const updateButton =
            document.getElementById(
                "updateStatusBtn"
            );


        const message =
            document.getElementById(
                "statusUpdateMessage"
            );


        updateButton.disabled =
            true;


        message.textContent =
            "Updating...";


        message.className =
            "status-update-message";


        const response =
            await fetch(
                "http://localhost:5000/api/admin/orders/" +
                encodeURIComponent(
                    currentOrderId
                ) +
                "/status",
                {
                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            "Bearer " + token

                    },

                    body: JSON.stringify({

                        status:
                            selectedStatus

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            message.textContent =
                data.message ||
                "Failed to update status.";


            message.className =
                "status-update-message error";


            return;
        }


        /* Update modal */

        document.getElementById(
            "modalOrderStatus"
        ).textContent =
            data.order.status;

            updateOrderTimeline(data.order.status);


        /* Success */

        message.textContent =
            "Order status updated successfully.";


        message.className =
            "status-update-message success";


        /* Refresh table */

        await loadAllOrders();


    } catch (error) {

        console.error(
            "Status update error:",
            error
        );


        const message =
            document.getElementById(
                "statusUpdateMessage"
            );


        if (message) {

            message.textContent =
                "Something went wrong.";

            message.className =
                "status-update-message error";

        }


    } finally {

        const updateButton =
            document.getElementById(
                "updateStatusBtn"
            );


        if (updateButton) {

            updateButton.disabled =
                false;

        }

    }

}


/* =========================================================
   MODAL CONTROLS
========================================================= */

function setupModalControls() {

    const closeButton =
        document.getElementById(
            "closeOrderModal"
        );


    const modal =
        document.getElementById(
            "orderModal"
        );


    const updateButton =
        document.getElementById(
            "updateStatusBtn"
        );


    /* Close button */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                modal.classList.remove(
                    "show"
                );

            }
        );

    }


    /* Click outside modal */

    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    /* Update status */

    if (updateButton) {

        updateButton.addEventListener(
            "click",
            updateOrderStatus
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

function setupLogout() {

    const logoutButton =
        document.getElementById(
            "adminLogout"
        );


    if (!logoutButton) {
        return;
    }


    logoutButton.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );


            window.location.href =
                "../login.html";

        }
    );

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
   UPDATE ORDER TIMELINE
========================================================= */

function updateOrderTimeline(status) {

    const steps = document.querySelectorAll(
        ".timeline-step"
    );

    const lines = document.querySelectorAll(
        ".timeline-line"
    );

    const cancelledNotice =
        document.getElementById(
            "cancelledOrderNotice"
        );

    const statusOrder = [
        "Placed",
        "Processing",
        "Shipped",
        "Delivered"
    ];

    /* CANCELLED ORDER */

    if (status === "Cancelled") {

        steps.forEach(step => {
            step.classList.remove(
                "completed",
                "current"
            );
        });

        lines.forEach(line => {
            line.classList.remove("completed");
        });

        if (cancelledNotice) {
            cancelledNotice.style.display = "flex";
        }

        return;
    }

    /* NORMAL ORDER */

    if (cancelledNotice) {
        cancelledNotice.style.display = "none";
    }

    const currentIndex =
        statusOrder.indexOf(status);

    steps.forEach((step, index) => {

        step.classList.remove(
            "completed",
            "current"
        );

        if (index < currentIndex) {

            step.classList.add(
                "completed"
            );

        } else if (index === currentIndex) {

            step.classList.add(
                "current"
            );
        }

    });

    lines.forEach((line, index) => {

        line.classList.remove("completed");

        if (index < currentIndex) {
            line.classList.add("completed");
        }

    });
}