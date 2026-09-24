/* =========================
   ORDER SUCCESS
========================= */

function getLatestOrder() {

    return JSON.parse(
        localStorage.getItem("latestOrder")
    );
}


/* =========================
   DISPLAY ORDER
========================= */

function displayOrder() {

    const order = getLatestOrder();

    if (!order) {
        window.location.href = "shop.html";
        return;
    }

    const orderId =
        document.getElementById("successOrderId");

    const total =
        document.getElementById("successTotal");

    const payment =
        document.getElementById("successPayment");


    /* Calculate total */

    let orderTotal = 0;

    order.items.forEach(item => {

        const price = Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        orderTotal += price * quantity;

    });


    orderId.textContent =
        order.orderId;

    total.textContent =
        `₹${orderTotal}`;

    payment.textContent =
        order.paymentMethod === "cod"
            ? "Cash on Delivery"
            : "Online Payment";
}


/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const count =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }
}


/* =========================
   START
========================= */

displayOrder();
updateCartCount();