
/* =========================
   BOTANICAL BLISS WISHLIST
========================= */


/* =========================
   GET LOGGED-IN USER
========================= */

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("user")
    ) || null;

}


/* =========================
   GET WISHLIST KEY
========================= */

function getWishlistKey() {

    const user =
        getCurrentUser();

    if (!user) {
        return null;
    }

    const userId =
        user._id ||
        user.id ||
        user.email;

    return `wishlist_${userId}`;

}


/* =========================
   GET WISHLIST
========================= */

function getWishlist() {

    const wishlistKey =
        getWishlistKey();

    if (!wishlistKey) {
        return [];
    }

    return JSON.parse(
        localStorage.getItem(wishlistKey)
    ) || [];

}


/* =========================
   SAVE WISHLIST
========================= */

function saveWishlist(wishlist) {

    const wishlistKey =
        getWishlistKey();

    if (!wishlistKey) {
        return;
    }

    localStorage.setItem(
        wishlistKey,
        JSON.stringify(wishlist)
    );

}


/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    const user =
        getCurrentUser();

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

    const count =
        cart.reduce(
            (total, item) =>
                total +
                Number(item.quantity || 0),
            0
        );

    cartCount.textContent = count;

}


/* =========================
   DISPLAY WISHLIST
========================= */

function displayWishlist() {

    const wishlistItems =
        document.getElementById(
            "wishlistItems"
        );

    if (!wishlistItems) {
        return;
    }

    const wishlist =
        getWishlist();


    /* EMPTY WISHLIST */

    if (wishlist.length === 0) {

        wishlistItems.innerHTML = `
            <div class="empty-wishlist">

                <i class="bi bi-heart"></i>

                <h2>Your Wishlist is Empty</h2>

                <p>
                    Save your favourite gardening products
                    here and come back to them later.
                </p>

                <a href="shop.html">
                    Explore Products
                </a>

            </div>
        `;

        return;
    }


    /* WISHLIST PRODUCTS */

    wishlistItems.innerHTML = "";


    wishlist.forEach(
        function(product, index) {

            const card =
                document.createElement("div");

            card.className =
                "wishlist-card";


            card.innerHTML = `

                <div class="wishlist-product-icon">
    <img
        src="${product.image || 'images/default-product.jpg'}"
        alt="${product.name || 'Product'}"
    >
</div>

                <div class="wishlist-product-info">

                    <span>
                        ${
                            product.category ||
                            "Gardening"
                        }
                    </span>

                    <h3>
                        ${
                            product.name ||
                            "Product"
                        }
                    </h3>

                    <strong>
                        ₹${
                            Number(
                                product.price
                            ) || 0
                        }
                    </strong>

                </div>


                <div class="wishlist-actions">

                    <button
                        type="button"
                        class="wishlist-cart-button"
                        onclick="addWishlistToCart(${index})"
                    >

                        <i class="bi bi-bag-plus"></i>

                        Add to Cart

                    </button>


                    <button
                        type="button"
                        class="wishlist-remove-button"
                        onclick="removeFromWishlist(${index})"
                        title="Remove from Wishlist"
                    >

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            `;

            wishlistItems.appendChild(card);

        }
    );

}


/* =========================
   REMOVE FROM WISHLIST
========================= */

function removeFromWishlist(index) {

    const wishlist =
        getWishlist();

    wishlist.splice(index, 1);

    saveWishlist(wishlist);

    displayWishlist();

}


/* =========================
   ADD WISHLIST ITEM TO CART
========================= */

function addWishlistToCart(index) {

    const wishlist =
        getWishlist();

    const product =
        wishlist[index];

    if (!product) {
        return;
    }


    /* GET LOGGED-IN USER */

    const user =
        getCurrentUser();

    if (!user) {

        alert(
            "Please login before adding products to your cart."
        );

        window.location.href =
            "login.html";

        return;
    }


    /* USER-SPECIFIC CART */

    const userId =
        user._id ||
        user.id ||
        user.email;

    const cartKey =
        `cart_${userId}`;


    let cart =
        JSON.parse(
            localStorage.getItem(cartKey)
        ) || [];


    const existingProduct =
        cart.find(
            function(item) {

                return (
                    item.name ===
                    product.name
                );

            }
        );


    if (existingProduct) {

        existingProduct.quantity =
            Number(
                existingProduct.quantity
            ) + 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    localStorage.setItem(
        cartKey,
        JSON.stringify(cart)
    );


    updateCartCount();

    window.location.href =
        "cart.html";

}


/* =========================
   START
========================= */

updateCartCount();

displayWishlist();
