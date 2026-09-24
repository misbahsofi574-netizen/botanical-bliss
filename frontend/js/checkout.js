/* =========================
   BOTANICAL BLISS CHECKOUT
========================= */

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user")) || null;
}

function getCartKey() {
    const user = getCurrentUser();

    if (!user) {
        return null;
    }

    const userId =
        user._id ||
        user.id ||
        user.email;

    return `cart_${userId}`;
}

function getCart() {
    const cartKey = getCartKey();

    if (!cartKey) {
        return [];
    }

    return JSON.parse(
        localStorage.getItem(cartKey)
    ) || [];
}



/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}


/* =========================
   DISPLAY ORDER SUMMARY
========================= */

function displayCheckout() {

    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutTotal =
        document.getElementById("checkoutTotal");

    const cart = getCart();

    if (!checkoutItems || !checkoutTotal) {
        return;
    }

    /* Empty cart */

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="empty-cart">
                <i class="bi bi-bag"></i>

                <h2>Your cart is empty</h2>

                <p>
                    Add some gardening products before checkout.
                </p>

                <a href="shop.html">
                    Continue Shopping
                </a>
            </div>
        `;

        checkoutTotal.textContent = "₹0";

        return;
    }


    let total = 0;

    checkoutItems.innerHTML = "";


    cart.forEach(item => {

        const price = Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        const itemTotal =
            price * quantity;

        total += itemTotal;


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "checkout-item";

        itemElement.innerHTML = `

            <div class="checkout-item-icon">
    <img
        src="${item.image}"
        alt="${item.name}"
    >
</div>

            <div class="checkout-item-info">

                <h3>${item.name}</h3>

                <p>
                    ₹${price} × ${quantity}
                </p>

            </div>

            <strong>
                ₹${itemTotal}
            </strong>

        `;

        checkoutItems.appendChild(itemElement);

    });


    checkoutTotal.textContent =
        `₹${total}`;
}


/* =========================
   PLACE ORDER
========================= */
const checkoutForm =
    document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const cart = getCart();

            if (cart.length === 0) {
                alert(
                    "Your cart is empty. Please add products first."
                );
                return;
            }

            const fullName =
                document.getElementById("fullName").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const address =
                document.getElementById("address").value.trim();

            const city =
                document.getElementById("city").value.trim();

            const pincode =
                document.getElementById("pincode").value.trim();

            const payment =
                document.getElementById("payment").value;

            const loggedInUser =
                JSON.parse(localStorage.getItem("user"));

            // Calculate total
            let total = 0;

            cart.forEach(item => {

                const price =
                    Number(
                        String(item.price)
                            .replace(/[₹,]/g, "")
                    ) || 0;

                const quantity =
                    Number(item.quantity) || 1;

                total += price * quantity;
            });


            // ==========================================
            // COMMON ORDER DATA
            // ==========================================

            const order = {

                orderId:
                    "BB" + Date.now(),

                userId:
                    loggedInUser?._id ||
                    loggedInUser?.id ||
                    null,

                userEmail:
                    loggedInUser?.email ||
                    email,

                customer: {

                    fullName,
                    email,
                    phone,
                    address,
                    city,
                    pincode

                },

                paymentMethod:
                    payment,

                items:
                    cart,

                totalAmount:
                    total,

                orderDate:
                    new Date().toISOString()

            };


            // ==========================================
            // CASH ON DELIVERY
            // ==========================================

            if (payment === "cod") {

                saveOrderAndFinish(order);

                return;
            }


            // ==========================================
            // ONLINE PAYMENT
            // ==========================================

            if (payment === "online") {

                try {

                    const message =
                        document.getElementById(
                            "checkoutMessage"
                        );

                    if (message) {
                        message.textContent =
                            "Opening secure payment...";
                    }


                    // Create Razorpay order
                    const response =
                        await fetch(
                            "http://localhost:5000/api/payment/create-order",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({
                                    amount: total
                                })
                            }
                        );


                    const data =
                        await response.json();


                    if (
                        !response.ok ||
                        !data.success
                    ) {

                        throw new Error(
                            data.message ||
                            "Unable to create payment order."
                        );

                    }


                    // ==================================
                    // RAZORPAY CHECKOUT
                    // ==================================

                    const options = {

                        key:
                            "rzp_test_Tf7nlCTPn0RXLF",

                        amount:
                            data.order.amount,

                        currency:
                            data.order.currency,

                        name:
                            "Botanical Bliss",

                        description:
                            "Gardening Products",

                        order_id:
                            data.order.id,

                        prefill: {

                            name:
                                fullName,

                            email:
                                email,

                            contact:
                                phone

                        },

                        theme: {

                            color:
                                "#2f5d3a"

                        },


                        // Payment successful
                        handler:
                            async function (
                                razorpayResponse
                            ) {

                                try {

                                    const verifyResponse =
                                        await fetch(
                                            "http://localhost:5000/api/payment/verify",
                                            {
                                                method: "POST",

                                                headers: {
                                                    "Content-Type":
                                                        "application/json"
                                                },

                                                body:
                                                    JSON.stringify({

                                                        razorpay_order_id:
                                                            razorpayResponse
                                                                .razorpay_order_id,

                                                        razorpay_payment_id:
                                                            razorpayResponse
                                                                .razorpay_payment_id,

                                                        razorpay_signature:
                                                            razorpayResponse
                                                                .razorpay_signature

                                                    })

                                            }
                                        );


                                    const verifyData =
                                        await verifyResponse
                                            .json();


                                    if (
                                        !verifyResponse.ok ||
                                        !verifyData.success
                                    ) {

                                        alert(
                                            "Payment verification failed. Please contact support."
                                        );

                                        return;

                                    }


                                    // Add payment information
                                    order.paymentStatus =
                                        "Paid";

                                    order.razorpayOrderId =
                                        razorpayResponse
                                            .razorpay_order_id;

                                    order.razorpayPaymentId =
                                        razorpayResponse
                                            .razorpay_payment_id;


                                    // Save order
                                    saveOrderAndFinish(
                                        order
                                    );

                                } catch (error) {

                                    console.error(
                                        "Payment verification error:",
                                        error
                                    );

                                    alert(
                                        "Payment verification failed."
                                    );

                                }

                            },


                        // Payment modal closed
                        modal:
                            {

                                ondismiss:
                                    function () {

                                        const message =
                                            document.getElementById(
                                                "checkoutMessage"
                                            );

                                        if (message) {

                                            message.textContent =
                                                "Payment cancelled. Your order was not placed.";

                                        }

                                    }

                            }

                    };


                    const razorpay =
                        new Razorpay(options);

                    razorpay.open();


                } catch (error) {

                    console.error(
                        "Online payment error:",
                        error
                    );

                    alert(
                        "Unable to start online payment. Please try again."
                    );

                }

                return;
            }


            // ==========================================
            // INVALID PAYMENT METHOD
            // ==========================================

            alert(
                "Please select a payment method."
            );

        }
    );

}


// ==========================================
// SAVE ORDER + CLEAR CART + REDIRECT
// ==========================================

function saveOrderAndFinish(order) {

    /* =========================
       CURRENT USER
    ========================= */

    const user =
        JSON.parse(
            localStorage.getItem("user")
        ) || null;


    /* User must be logged in */

    if (!user) {

        alert("Please login before placing an order.");

        window.location.href = "login.html";

        return;

    }


    /* =========================
       USER-SPECIFIC ORDER KEY
    ========================= */

    const userId =
        user._id ||
        user.id ||
        user.email;


    const orderKey =
        `orders_${userId}`;


    /* =========================
       GET EXISTING USER ORDERS
    ========================= */

    const existingOrders =
        JSON.parse(
            localStorage.getItem(orderKey)
        ) || [];


    /* Add newest order at the top */

    existingOrders.unshift(order);


    /* Save only for this user */

    localStorage.setItem(
        orderKey,
        JSON.stringify(existingOrders)
    );


    /* =========================
       LATEST ORDER
    ========================= */

    localStorage.setItem(
        "latestOrder",
        JSON.stringify(order)
    );


    /* =========================
       CLEAR USER CART
    ========================= */

    const cartKey =
        getCartKey();

    if (cartKey) {

        localStorage.removeItem(
            cartKey
        );

    }


    /* =========================
       ORDER SUCCESS PAGE
    ========================= */

    window.location.href =
        window.location.pathname.replace(
            "checkout.html",
            "order-success.html"
        );

}

updateCartCount();
displayCheckout();