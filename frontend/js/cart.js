
/* =========================
   BOTANICAL BLISS CART
========================= */

// Get currently logged-in user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user")) || null;
}

// Create a separate cart key for each user
function getCartKey() {
    const user = getCurrentUser();

    if (!user) {
        return null;
    }

    const userId = user._id || user.id || user.email;

    return `cart_${userId}`;
}


/* =========================
   GET CART
========================= */

function getCart() {
    const cartKey = getCartKey();

    if (!cartKey) {
        return [];
    }

    return JSON.parse(localStorage.getItem(cartKey)) || [];
}


/* =========================
   SAVE CART
========================= */

function saveCart(cart) {
    const cartKey = getCartKey();

    if (!cartKey) {
        return;
    }

    localStorage.setItem(
        cartKey,
        JSON.stringify(cart)
    );
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
   DISPLAY CART
========================= */

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) {
        return;
    }

    const cart = getCart();

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="bi bi-bag"></i>

                <h2>Your cart is empty</h2>

                <p>
                    Looks like you haven't added anything yet.
                </p>

                <a href="shop.html">
                    Continue Shopping
                </a>
            </div>
        `;

        cartTotal.textContent = "₹0";

        return;
    }


    let total = 0;

    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const itemPrice =
            Number(item.price) || 0;

        const itemQuantity =
            Number(item.quantity) || 1;

        const itemTotal =
            itemPrice * itemQuantity;

        total += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `
            <div class="cart-item-icon">
                <img
                    src="${item.image}"
                    alt="${item.name}"
                >
            </div>

            <div class="cart-item-info">

                <p>${item.category}</p>

                <h3>${item.name}</h3>

                <strong>₹${item.price}</strong>

            </div>


            <div class="cart-quantity">

                <button
                    onclick="changeQuantity(${index}, -1)"
                >
                    <i class="bi bi-dash"></i>
                </button>

                <span>${item.quantity}</span>

                <button
                    onclick="changeQuantity(${index}, 1)"
                >
                    <i class="bi bi-plus"></i>
                </button>

            </div>


            <div class="cart-item-total">

                <strong>
                    ₹${itemTotal}
                </strong>

                <button
                    class="remove-cart"
                    onclick="removeFromCart(${index})"
                >
                    <i class="bi bi-trash3"></i>
                </button>

            </div>
        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =
        `₹${Number(total) || 0}`;
}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(index, amount) {

    const cart = getCart();

    if (!cart[index]) {
        return;
    }

    cart[index].quantity =
        Number(cart[index].quantity || 1) + amount;


    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }


    saveCart(cart);

    updateCartCount();

    displayCart();
}


/* =========================
   REMOVE PRODUCT
========================= */

function removeFromCart(index) {

    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    updateCartCount();

    displayCart();
}


/* =========================
   CHECKOUT
========================= */

const checkoutButton =
    document.getElementById("checkoutButton");

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            const user =
                getCurrentUser();

            if (!user) {
                alert(
                    "Please login before proceeding to checkout."
                );

                window.location.href =
                    "login.html";

                return;
            }


            const cart = getCart();

            if (cart.length === 0) {
                alert("Your cart is empty.");
                return;
            }


            window.location.href =
                "checkout.html";
        }
    );
}


/* =========================
   START
========================= */

updateCartCount();

displayCart();
