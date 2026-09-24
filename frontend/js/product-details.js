/* =========================================
   BOTANICAL BLISS
   PRODUCT DETAILS
========================================= */


/* =========================================
   PRODUCT DATA
========================================= */

const products = [

    {
        name: "Peace Lily",
        category: "Indoor Plants",
        price: 399,
        image: "images/peace-lily.jpg",
        description:
            "A beautiful indoor plant known for its elegant white flowers and air-purifying qualities.",
        features: [
            "Easy to grow indoors",
            "Low maintenance",
            "Helps improve indoor air quality"
        ]
    },

    {
        name: "Seed Collection",
        category: "Seeds",
        price: 199,
        image: "images/rose-seeds.jpg",
        description:
            "A carefully selected collection of rose seeds for growing beautiful and colourful roses at home.",
        features: [
            "Suitable for home gardens",
            "Beautiful flowering plants",
            "Easy to sow"
        ]
    },

    {
        name: "Organic Plant Food",
        category: "Organic Care",
        price: 299,
        image: "images/organic-plant-food.jpg",
        description:
            "Organic plant food designed to provide essential nutrients and support healthy plant growth.",
        features: [
            "Organic formula",
            "Supports healthy growth",
            "Suitable for garden plants"
        ]
    },

    {
        name: "Garden Tool Set",
        category: "Gardening Tools",
        price: 599,
        image: "images/garden-tool-set.jpg",
        description:
            "A practical collection of essential gardening tools for everyday planting and garden care.",
        features: [
            "Essential gardening tools",
            "Useful for everyday gardening",
            "Suitable for beginners"
        ]
    },

    {
        name: "Snake Plant",
        category: "Indoor Plants",
        price: 449,
        image: "images/snake-plant.jpg",
        description:
            "A hardy and stylish indoor plant that requires minimal care and adds a fresh touch to your space.",
        features: [
            "Very low maintenance",
            "Suitable for indoors",
            "Tolerates low light"
        ]
    },

    {
        name: "Herb Seed Kit",
        category: "Seeds",
        price: 249,
        image: "images/herb-seed-kit.jpg",
        description:
            "A convenient seed kit for growing fresh herbs at home and adding greenery to your garden.",
        features: [
            "Great for home gardening",
            "Fresh herbs at home",
            "Beginner friendly"
        ]
    },

    {
        name: "Organic Compost",
        category: "Organic Care",
        price: 349,
        image: "images/organic-compost.jpg",
        description:
            "Rich organic compost that helps improve soil quality and provides nutrients for healthy plants.",
        features: [
            "Improves soil quality",
            "Organic and natural",
            "Supports plant growth"
        ]
    },

    {
        name: "Pruning Tool Kit",
        category: "Gardening Tools",
        price: 499,
        image: "images/pruning-tool-kit.jpg",
        description:
            "A useful pruning tool kit designed to help keep plants healthy, neat and well maintained.",
        features: [
            "Useful for pruning",
            "Suitable for regular garden care",
            "Easy to use"
        ]
    },

    {
    name: "Lavender",
    category: "Indoor Plants",
    price: 499,
    image: "images/lavender.jpg",
    description:
        "A beautiful and fragrant plant that adds colour and a calming natural touch to your home or garden.",
    features: [
        "Beautiful purple flowers",
        "Pleasant natural fragrance",
        "Suitable for home gardening"
    ]
}

];


/* =========================================
   GET PRODUCT FROM URL
========================================= */

const urlParams =
    new URLSearchParams(window.location.search);

const productName =
    urlParams.get("product") || "Peace Lily";
/* =========================================
   QUANTITY
========================================= */

let quantity = 1;


/* =========================================
   DISPLAY PRODUCT
========================================= */

function displayProduct() {

    const container =
        document.getElementById("productDetails");


    if (!container) {
        return;
    }


    const product =
        products.find(function(item) {

            return item.name === productName;

        });


    /* PRODUCT NOT FOUND */

    if (!product) {

        container.innerHTML = `

            <div class="product-not-found">

                <i class="bi bi-flower1"></i>

                <h2>Product Not Found</h2>

                <p>
                    Please return to the shop and select a product.
                </p>

                <a href="shop.html">
                    Back to Shop
                </a>

            </div>

        `;

        return;
    }


    /* DISPLAY PRODUCT */

    container.innerHTML = `

        <div class="product-detail-card">


            <!-- IMAGE -->

            <div class="product-detail-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <!-- INFORMATION -->

            <div class="product-detail-info">

                <span class="product-category">
                    ${product.category}
                </span>


                <h1>
                    ${product.name}
                </h1>


                <div class="product-price">
                    ₹${product.price}
                </div>


                <p class="product-description">
                    ${product.description}
                </p>


                <!-- FEATURES -->

                <h3>
                    Product Features
                </h3>


                <ul class="product-features">

                    ${product.features.map(function(feature) {

                        return `
                            <li>
                                <i class="bi bi-check-circle"></i>
                                ${feature}
                            </li>
                        `;

                    }).join("")}

                </ul>


                <!-- QUANTITY -->

                <div class="quantity-section">

                    <span>
                        Quantity:
                    </span>

                    <div class="quantity-controls">

                        <button
                            type="button"
                            onclick="decreaseQuantity()">
                            −
                        </button>

                        <span id="quantity">
                            1
                        </span>

                        <button
                            type="button"
                            onclick="increaseQuantity()">
                            +
                        </button>

                    </div>

                </div>


                <!-- BUTTONS -->

                <a href="shop.html" class="back-to-shop">
    <i class="bi bi-arrow-left"></i>
    Back to Shop
</a>

                <div class="product-buttons">

                    <button
                        type="button"
                        class="add-cart-btn"
                        onclick="addToCart()">

                        <i class="bi bi-bag-plus"></i>

                        Add to Cart

                    </button>


                    <button
                        type="button"
                        class="wishlist-btn"
                        onclick="addToWishlist()">

                        <i class="bi bi-heart"></i>

                        Add to Wishlist

                    </button>

                </div>

            </div>

        </div>

    `;

}


/* =========================================
   INCREASE QUANTITY
========================================= */

function increaseQuantity() {

    quantity++;

    document.getElementById("quantity").textContent =
        quantity;

}


/* =========================================
   DECREASE QUANTITY
========================================= */

function decreaseQuantity() {

    if (quantity > 1) {

        quantity--;

        document.getElementById("quantity").textContent =
            quantity;

    }

}




/* =========================================
   ADD TO CART
========================================= */

function addToCart() {

    const product =
        products.find(function(item) {
            return item.name === productName;
        });

    if (!product) {
        return;
    }


    /* GET LOGGED-IN USER */

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if (!user) {

        alert(
            "Please login before adding products to your cart."
        );

        window.location.href =
            "login.html";

        return;
    }


    /* CREATE USER-SPECIFIC CART KEY */

    const userId =
        user.id ||
        user._id ||
        user.email;

    const cartKey =
        "cart_" + userId;


    /* GET USER'S CART */

    let cart =
        JSON.parse(
            localStorage.getItem(cartKey)
        ) || [];


    /* CHECK IF PRODUCT ALREADY EXISTS */

    const existingProduct =
        cart.find(function(item) {
            return item.name === product.name;
        });


    if (existingProduct) {

        existingProduct.quantity =
            Number(
                existingProduct.quantity || 0
            ) + quantity;

    } else {

        cart.push({

            name:
                product.name,

            category:
                product.category,

            price:
                product.price,

            image:
                product.image,

            quantity:
                quantity

        });

    }


    /* SAVE USER-SPECIFIC CART */

    localStorage.setItem(
        cartKey,
        JSON.stringify(cart)
    );


    /* UPDATE CART COUNT */

    updateCartCount();


    alert(
        product.name +
        " added to cart!"
    );


    /* RESET QUANTITY */

    quantity = 1;

    const quantityElement =
        document.getElementById(
            "quantity"
        );

    if (quantityElement) {

        quantityElement.textContent =
            "1";

    }
}



/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }


    /* No logged-in user */

    if (!user) {
        cartCount.textContent = "0";
        return;
    }


    /* USER-SPECIFIC CART */

    const userId =
        user._id || user.id || user.email;

    const cartKey =
        `cart_${userId}`;


    const cart =
        JSON.parse(
            localStorage.getItem(cartKey)
        ) || [];


    let total = 0;

    cart.forEach(function(item) {

        total +=
            Number(item.quantity || 0);

    });


    cartCount.textContent = total;
}


/* =========================================
   ADD TO WISHLIST
========================================= */

function addToWishlist() {

    const product =
        products.find(function(item) {
            return item.name === productName;
        });

    if (!product) {
        return;
    }


    /* GET LOGGED-IN USER */

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    if (!user) {

        alert(
            "Please login before adding products to your wishlist."
        );

        window.location.href =
            "login.html";

        return;
    }


    /* CREATE USER-SPECIFIC WISHLIST KEY */

    const userId =
        user._id ||
        user.id ||
        user.email;

    const wishlistKey =
        `wishlist_${userId}`;


    /* GET USER'S WISHLIST */

    let wishlist =
        JSON.parse(
            localStorage.getItem(wishlistKey)
        ) || [];


    /* CHECK IF PRODUCT ALREADY EXISTS */

    const alreadyExists =
        wishlist.some(function(item) {

            return (
                item.name ===
                product.name
            );

        });


    if (alreadyExists) {

        alert(
            "This product is already in your wishlist."
        );

        return;
    }


    /* ADD PRODUCT */

    wishlist.push({

        name: product.name,

        category: product.category,

        price: product.price,

        image: product.image

    });


    /* SAVE USER'S WISHLIST */

    localStorage.setItem(
        wishlistKey,
        JSON.stringify(wishlist)
    );


    alert(
        product.name +
        " added to wishlist!"
    );

}


/* =========================================
   REVIEWS
========================================= */

let selectedRating = 0;


/* =========================================
   STAR RATING
========================================= */

const ratingButtons =
    document.querySelectorAll(
        ".star-rating button"
    );


ratingButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            selectedRating =
                Number(
                    button.dataset.rating
                );


            ratingButtons.forEach(
                function(starButton) {

                    const rating =
                        Number(
                            starButton.dataset.rating
                        );


                    const icon =
                        starButton.querySelector("i");


                    if (
                        rating <= selectedRating
                    ) {

                        icon.classList.remove(
                            "bi-star"
                        );

                        icon.classList.add(
                            "bi-star-fill"
                        );

                    } else {

                        icon.classList.remove(
                            "bi-star-fill"
                        );

                        icon.classList.add(
                            "bi-star"
                        );

                    }

                }
            );

        }
    );

});


/* =========================================
   GET REVIEWS
========================================= */

function getReviews() {

    const allReviews =
        JSON.parse(
            localStorage.getItem("productReviews")
        ) || {};


    return allReviews[productName] || [];

}


/* =========================================
   SAVE REVIEWS
========================================= */

function saveReviews(reviews) {

    const allReviews =
        JSON.parse(
            localStorage.getItem("productReviews")
        ) || {};


    allReviews[productName] =
        reviews;


    localStorage.setItem(
        "productReviews",
        JSON.stringify(allReviews)
    );

}


 /* =========================================
   DISPLAY REVIEWS
========================================= */

function displayReviews() {

    const reviewsList =
        document.getElementById("reviewsList");

    if (!reviewsList) {
        return;
    }

    const reviews = getReviews();

    if (reviews.length === 0) {

        reviewsList.innerHTML = `
            <div class="no-reviews">

                <i class="bi bi-chat-heart"></i>

                <h3>
                    No Reviews Yet
                </h3>

                <p>
                    Be the first to review this product.
                </p>

            </div>
        `;

        return;
    }

    reviewsList.innerHTML = "";

    reviews.forEach(function(review) {

        let stars = "";

        for (let i = 1; i <= 5; i++) {

            if (i <= review.rating) {

                stars +=
                    '<i class="bi bi-star-fill"></i>';

            } else {

                stars +=
                    '<i class="bi bi-star"></i>';

            }
        }

        /* CREATE REVIEW CARD */

        const reviewCard =
            document.createElement("div");

        reviewCard.className =
            "review-card";

        /* DISPLAY REVIEW */

        reviewCard.innerHTML = `

            <div class="review-stars">
                ${stars}
            </div>

            <p>
                ${review.text}
            </p>

            ${
                review.image
                    ? `
                        <div class="review-image">
                            <img
                                src="${review.image}"
                                alt="Product review image">
                        </div>
                      `
                    : ""
            }

            <small>
                ${review.date}
            </small>

        `;

        reviewsList.appendChild(reviewCard);

    });
}

/* =========================================
   SUBMIT REVIEW
========================================= */

const submitReview =
    document.getElementById("submitReview");

if (submitReview) {

    submitReview.addEventListener(
        "click",
        function () {

            const reviewText =
                document.getElementById("reviewText")
                    .value.trim();

            const reviewImage =
                document.getElementById("reviewImage");

            if (selectedRating === 0) {
                alert("Please select a rating.");
                return;
            }

            if (reviewText === "") {
                alert("Please write a review.");
                return;
            }

            /* GET SELECTED IMAGE */

            const file =
                reviewImage.files[0];

            /* FUNCTION TO SAVE REVIEW */

            function saveReviewWithImage(imageData) {

                const reviews = getReviews();

                reviews.unshift({
                    rating: selectedRating,
                    text: reviewText,
                    image: imageData || "",
                    date:
                        new Date()
                            .toLocaleDateString()
                });

                saveReviews(reviews);

                /* CLEAR FORM */

                document.getElementById(
                    "reviewText"
                ).value = "";

                reviewImage.value = "";

                selectedRating = 0;

                ratingButtons.forEach(
                    function (button) {

                        const icon =
                            button.querySelector("i");

                        icon.classList.remove(
                            "bi-star-fill"
                        );

                        icon.classList.add(
                            "bi-star"
                        );
                    }
                );

                displayReviews();

                alert(
                    "Your review has been submitted!"
                );
            }

            /* IF IMAGE IS SELECTED */

            if (file) {

                const reader =
                    new FileReader();

                reader.onload = function () {

                    saveReviewWithImage(
                        reader.result
                    );

                };

                reader.readAsDataURL(file);

            } else {

                /* REVIEW WITHOUT IMAGE */

                saveReviewWithImage("");

            }
        }
    );
}


/* =========================================
   START PAGE
========================================= */

updateCartCount();

displayProduct();

displayReviews();

/* =========================
   MAKE FUNCTIONS AVAILABLE
   TO HTML BUTTONS
========================= */

window.displayProduct = displayProduct;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.addToCart = addToCart;
window.addToWishlist = addToWishlist;
window.updateCartCount = updateCartCount;
