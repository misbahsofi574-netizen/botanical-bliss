
/* =========================================================
   BOTANICAL BLISS CHECKOUT
========================================================= */


/* =========================================================
   API
========================================================= */

const AUTH_API =
    "http://localhost:5000/api/auth";

const ORDERS_API =
    "http://localhost:5000/api/orders";


/* =========================================================
   GET CURRENT USER
========================================================= */

function getCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem("user")
        ) || null;

    } catch (error) {

        console.error(
            "Invalid user data:",
            error
        );

        return null;
    }
}


/* =========================================================
   GET JWT TOKEN
========================================================= */

function getToken() {

    return localStorage.getItem("token");
}


/* =========================================================
   GET CART KEY
========================================================= */

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


/* =========================================================
   GET CART
========================================================= */

function getCart() {

    const cartKey =
        getCartKey();


    if (!cartKey) {
        return [];
    }


    try {

        return JSON.parse(
            localStorage.getItem(cartKey)
        ) || [];

    } catch (error) {

        return [];
    }
}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const cart =
        getCart();


    const totalItems =
        cart.reduce(
            (total, item) =>
                total +
                Number(item.quantity || 0),
            0
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            totalItems;
    }
}


/* =========================================================
   LOAD SAVED PROFILE FROM MONGODB
========================================================= */

async function loadSavedProfile() {

    const user =
        getCurrentUser();

    const token =
        getToken();


    /* ---------- Login check ---------- */

    if (!user || !token) {

        alert(
            "Please login before checkout."
        );

        window.location.href =
            "login.html";

        return;
    }


    try {

        const response =
            await fetch(
                `${AUTH_API}/profile`,
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


        /* ---------- Invalid session ---------- */

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            alert(
                "Your login session has expired. Please login again."
            );

            window.location.href =
                "login.html";

            return;
        }


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to load saved profile."
            );
        }


        if (!data.user) {

            throw new Error(
                "Profile information not found."
            );
        }


        const profile =
            data.user;


        /* =====================================================
           UPDATE LOCAL USER DATA

           Keep localStorage synchronized with MongoDB.
        ===================================================== */

        localStorage.setItem(
            "user",
            JSON.stringify({
                _id:
                    profile._id,

                id:
                    profile.id,

                name:
                    profile.name,

                email:
                    profile.email,

                role:
                    profile.role,

                phone:
                    profile.phone || "",

                profilePic:
                    profile.profilePic || "",

                address:
                    profile.address || "",

                city:
                    profile.city || "",

                pincode:
                    profile.pincode || ""
            })
        );


        /* =====================================================
           FILL CHECKOUT FORM
        ===================================================== */

        const fullName =
            document.getElementById(
                "fullName"
            );

        const email =
            document.getElementById(
                "email"
            );

        const phone =
            document.getElementById(
                "phone"
            );

        const address =
            document.getElementById(
                "address"
            );

        const city =
            document.getElementById(
                "city"
            );

        const pincode =
            document.getElementById(
                "pincode"
            );


        if (fullName) {

            fullName.value =
                profile.name || "";
        }


        if (email) {

            email.value =
                profile.email || "";
        }


        if (phone) {

            phone.value =
                profile.phone || "";
        }


        if (address) {

            address.value =
                profile.address || "";
        }


        if (city) {

            city.value =
                profile.city || "";
        }


        if (pincode) {

            pincode.value =
                profile.pincode || "";
        }


        /* =====================================================
           SHOW SAVED ADDRESS MESSAGE
        ===================================================== */

        showSavedAddressMessage(
            profile
        );


    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

        /*
           We don't stop checkout if the profile
           cannot be fetched. The user can still
           manually enter the details.
        */

        const message =
            document.getElementById(
                "checkoutMessage"
            );

        if (message) {

            message.textContent =
                "Saved details could not be loaded. You can enter them manually.";
        }
    }
}


/* =========================================================
   SAVED ADDRESS MESSAGE
========================================================= */

function showSavedAddressMessage(profile) {

    const address =
        profile.address || "";

    const city =
        profile.city || "";

    const pincode =
        profile.pincode || "";


    /*
       Only show message when some address
       information actually exists.
    */

    if (
        !address &&
        !city &&
        !pincode
    ) {
        return;
    }


    const addressField =
        document.getElementById(
            "address"
        );


    if (!addressField) {
        return;
    }


    /*
       Don't create duplicate messages.
    */

    const existingMessage =
        document.getElementById(
            "savedAddressMessage"
        );


    if (existingMessage) {
        return;
    }


    const message =
        document.createElement("small");


    message.id =
        "savedAddressMessage";


    message.innerHTML =
        '<i class="bi bi-check-circle-fill"></i> Saved address loaded from your profile. You can edit it for this order.';


    /*
       Small inline styling so we don't
       need to modify checkout.css.
    */

    message.style.display =
        "block";

    message.style.marginTop =
        "8px";

    message.style.fontSize =
        "13px";

    message.style.color =
        "#2f5d3a";


    addressField.parentElement
        .appendChild(message);
}


/* =========================================================
   DISPLAY ORDER SUMMARY
========================================================= */

function displayCheckout() {

    const checkoutItems =
        document.getElementById(
            "checkoutItems"
        );


    const checkoutTotal =
        document.getElementById(
            "checkoutTotal"
        );


    const cart =
        getCart();


    if (
        !checkoutItems ||
        !checkoutTotal
    ) {
        return;
    }


    /* =====================================================
       EMPTY CART
    ===================================================== */

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="empty-cart">

                <i class="bi bi-bag"></i>

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some gardening products
                    before checkout.
                </p>

                <a href="shop.html">
                    Continue Shopping
                </a>

            </div>

        `;


        checkoutTotal.textContent =
            "₹0";

        return;
    }


    let total = 0;


    checkoutItems.innerHTML =
        "";


    cart.forEach(item => {

        const price =
            Number(
                String(item.price)
                    .replace(/[₹,]/g, "")
            ) || 0;


        const quantity =
            Number(item.quantity) || 1;


        const itemTotal =
            price * quantity;


        total += itemTotal;


        const itemElement =
            document.createElement(
                "div"
            );


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

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${price} × ${quantity}
                </p>

            </div>


            <strong>
                ₹${itemTotal}
            </strong>

        `;


        checkoutItems.appendChild(
            itemElement
        );
    });


    checkoutTotal.textContent =
        `₹${total}`;
}


/* =========================================================
   CHECKOUT FORM
========================================================= */

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            /* =================================================
               GET CART
            ================================================= */

            const cart =
                getCart();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add products first."
                );

                return;
            }


            /* =================================================
               CHECK LOGIN
            ================================================= */

            const loggedInUser =
                getCurrentUser();


            if (!loggedInUser) {

                alert(
                    "Please login before placing an order."
                );

                window.location.href =
                    "login.html";

                return;
            }


            /* =================================================
               GET CUSTOMER DETAILS
            ================================================= */

            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            const city =
                document
                    .getElementById("city")
                    .value
                    .trim();


            const pincode =
                document
                    .getElementById("pincode")
                    .value
                    .trim();


            const payment =
                document
                    .getElementById("payment")
                    .value;


            /* =================================================
               BASIC VALIDATION
            ================================================= */

            if (!fullName) {

                alert(
                    "Please enter your full name."
                );

                return;
            }


            if (!phone) {

                alert(
                    "Please enter your phone number."
                );

                return;
            }


            if (!address) {

                alert(
                    "Please enter your delivery address."
                );

                return;
            }


            if (!city) {

                alert(
                    "Please enter your city."
                );

                return;
            }


            if (!pincode) {

                alert(
                    "Please enter your PIN code."
                );

                return;
            }


            if (!payment) {

                alert(
                    "Please select a payment method."
                );

                return;
            }


            /* =================================================
               PHONE VALIDATION
            ================================================= */

            if (
                !/^[0-9]{10,15}$/.test(phone)
            ) {

                alert(
                    "Please enter a valid phone number."
                );

                return;
            }


            /* =================================================
               PINCODE VALIDATION
            ================================================= */

            if (
                !/^[0-9]{4,10}$/.test(pincode)
            ) {

                alert(
                    "Please enter a valid PIN code."
                );

                return;
            }


            /* =================================================
               GET JWT TOKEN
            ================================================= */

            const token =
                getToken();


            if (!token) {

                alert(
                    "Your login session has expired. Please login again."
                );

                window.location.href =
                    "login.html";

                return;
            }


            /* =================================================
               CALCULATE TOTAL
            ================================================= */

            let total = 0;


            cart.forEach(item => {

                const price =
                    Number(
                        String(item.price)
                            .replace(/[₹,]/g, "")
                    ) || 0;


                const quantity =
                    Number(item.quantity) || 1;


                total +=
                    price * quantity;
            });


            /* =================================================
               COMMON ORDER DATA

               IMPORTANT:
               This creates a snapshot of the address
               used for THIS order.

               If the user changes their profile later,
               old orders will still contain the original
               delivery address.
            ================================================= */

            const order = {

                orderId:
                    "BB" + Date.now(),


                userEmail:
                    loggedInUser.email ||
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


            /* =================================================
               CASH ON DELIVERY
            ================================================= */

            if (payment === "cod") {

                await saveOrderAndFinish(
                    order
                );

                return;
            }


            /* =================================================
               ONLINE PAYMENT
            ================================================= */

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


                    /* =========================================
                       CREATE RAZORPAY ORDER
                    ========================================= */

                    const response =
                        await fetch(
                            "https://botanical-bliss-52ra.onrender.com/api/payment/create-order",
                            {
                                method:
                                    "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({
                                        amount:
                                            total
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


                    /* =========================================
                       RAZORPAY CHECKOUT
                    ========================================= */

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


                        /* =====================================
                           PAYMENT SUCCESSFUL
                        ===================================== */

                        handler:
                            async function(
                                razorpayResponse
                            ) {

                                try {

                                    const verifyResponse =
                                        await fetch(
                                            "https://botanical-bliss-52ra.onrender.com/api/payment/verify",
                                            {
                                                method:
                                                    "POST",

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


                                    /* =================================
                                       ADD PAYMENT INFORMATION
                                    ================================= */

                                    order.paymentStatus =
                                        "Paid";


                                    order.razorpayOrderId =
                                        razorpayResponse
                                            .razorpay_order_id;


                                    order.razorpayPaymentId =
                                        razorpayResponse
                                            .razorpay_payment_id;


                                    /* =================================
                                       SAVE ORDER TO MONGODB
                                    ================================= */

                                    await saveOrderAndFinish(
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


                        /* =====================================
                           PAYMENT MODAL CLOSED
                        ===================================== */

                        modal: {

                            ondismiss:
                                function() {

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
                        new Razorpay(
                            options
                        );


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


            /* =================================================
               INVALID PAYMENT METHOD
            ================================================= */

            alert(
                "Please select a payment method."
            );
        }
    );
}


/* =========================================================
   SAVE ORDER TO MONGODB
   + CLEAR CART
   + REDIRECT
========================================================= */

async function saveOrderAndFinish(order) {

    /* =====================================================
       CURRENT USER
    ===================================================== */

    const user =
        getCurrentUser();


    if (!user) {

        alert(
            "Please login before placing an order."
        );

        window.location.href =
            "login.html";

        return;
    }


    /* =====================================================
       JWT TOKEN
    ===================================================== */

    const token =
        getToken();


    if (!token) {

        alert(
            "Your login session has expired. Please login again."
        );

        window.location.href =
            "login.html";

        return;
    }


    try {

        /* =================================================
           SAVE ORDER TO BACKEND
        ================================================= */

        const response =
            await fetch(
                ORDERS_API,
                {
                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body:
                        JSON.stringify(order)
                }
            );


        const data =
            await response.json();


        /* =================================================
           CHECK RESPONSE
        ================================================= */

        if (
            !response.ok ||
            !data.success
        ) {

            console.error(
                "Order save failed:",
                data
            );


            alert(
                data.message ||
                "Unable to save your order. Please try again."
            );

            return;
        }


        /* =================================================
           SAVE LATEST ORDER
           FOR SUCCESS PAGE
        ================================================= */

        localStorage.setItem(
            "latestOrder",
            JSON.stringify(
                data.order || order
            )
        );


        /* =================================================
           CLEAR USER CART
        ================================================= */

        const cartKey =
            getCartKey();


        if (cartKey) {

            localStorage.removeItem(
                cartKey
            );
        }


        /* =================================================
           UPDATE CART COUNT
        ================================================= */

        updateCartCount();


        /* =================================================
           ORDER SUCCESS PAGE
        ================================================= */

        window.location.href =
            window.location.pathname.replace(
                "checkout.html",
                "order-success.html"
            );

    } catch (error) {

        console.error(
            "Save order error:",
            error
        );


        alert(
            "Unable to connect to the server. Your order was not placed. Please try again."
        );
    }
}


/* =========================================================
   INITIAL LOAD
========================================================= */

updateCartCount();

displayCheckout();

/*
   Load the saved MongoDB profile after the
   checkout page has rendered.
*/

loadSavedProfile()