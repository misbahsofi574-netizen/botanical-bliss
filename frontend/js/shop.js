const products = [

    {
        name: "Peace Lily",
        category: "Indoor Plants",
        price: 399,
        icon: "bi-flower2",
        image: "images/peace-lily.jpg"
    },

    {
        name: "Seed Collection",
        category: "Seeds",
        price: 199,
        icon: "bi-flower1",
        image: "images/rose-seeds.jpg"
    },

    {
        name: "Organic Plant Food",
        category: "Organic Care",
        price: 299,
        icon: "bi-droplet-half",
        image: "images/organic-plant-food.jpg"
    },

    {
        name: "Garden Tool Set",
        category: "Gardening Tools",
        price: 599,
        icon: "bi-tools",
        image: "images/garden-tool-set.jpg"
    },

    {
        name: "Snake Plant",
        category: "Indoor Plants",
        price: 449,
        icon: "bi-flower3",
        image: "images/snake-plant.jpg"
    },

    {
        name: "Herb Seed Kit",
        category: "Seeds",
        price: 249,
        icon: "bi-flower1",
        image: "images/herb-seed-kit.jpg"
    },

    {
        name: "Organic Compost",
        category: "Organic Care",
        price: 349,
        icon: "bi-droplet",
        image: "images/organic-compost.jpg"
    },

    {
        name: "Pruning Tool Kit",
        category: "Gardening Tools",
        price: 499,
        icon: "bi-tools",
        image: "images/pruning-tool-kit.jpg"
    },

    {
    name: "Lavender",
    category: "Indoor Plants",
    price: 499,
    icon: "bi-flower3",
    image: "images/lavender.jpg"
}

];



function getCurrentUser() {
    return JSON.parse(
        localStorage.getItem("user")
    ) || null;
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

 id="lq4g7d"

 id="lq4g7d"
function updateCartCount() {

    const cart =
        getCart();

    const count =
        cart.reduce(
            function(total, item) {
                return total +
                    Number(item.quantity || 0);
            },
            0
        );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent =
            count;
    }
}

/* CATEGORY FILTER */

const filterButtons = document.querySelectorAll(".shop-filter");
const productCards = document.querySelectorAll(".shop-product-card");
const productCount = document.querySelector(".product-count");

const productSearch =
    document.getElementById("productSearch");

if (productSearch) {
    productSearch.addEventListener("input", function () {

        const searchTerm =
            productSearch.value.trim().toLowerCase();

        let visibleCount = 0;

        productCards.forEach(function (card, index) {

            const product = products[index];

            const productName =
                product.name.toLowerCase();

            const productCategory =
                product.category.toLowerCase();

            const matchesSearch =
                productName.includes(searchTerm) ||
                productCategory.includes(searchTerm);

            if (matchesSearch) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (productCount) {
            productCount.textContent =
                visibleCount + " Products";
        }
    });
}


filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedFilter =
            button.textContent.trim();

        let visibleCount = 0;


        productCards.forEach(function(card, index) {

            const product = products[index];

            let showProduct = false;


            if (selectedFilter === "All") {

                showProduct = true;

            } else if (
                selectedFilter === "Plants" &&
                product.category === "Indoor Plants"
            ) {

                showProduct = true;

            } else if (
                selectedFilter === "Seeds" &&
                product.category === "Seeds"
            ) {

                showProduct = true;

            } else if (
                selectedFilter === "Fertilizers" &&
                product.category === "Organic Care"
            ) {

                showProduct = true;

            } else if (
                selectedFilter === "Garden Tools" &&
                product.category === "Gardening Tools"
            ) {

                showProduct = true;
            }


            if (showProduct) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }

        });


        if (productCount) {
            productCount.textContent =
                visibleCount + " Products";
        }

    });

});


/* CATEGORY FROM URL */

const urlParams = new URLSearchParams(
    window.location.search
);

const selectedCategory =
    urlParams.get("category");


if (selectedCategory) {

    let filterName = "";

    if (selectedCategory === "Indoor Plants") {
        filterName = "Plants";
    }

    if (selectedCategory === "Seeds") {
        filterName = "Seeds";
    }

    if (selectedCategory === "Organic Care") {
        filterName = "Fertilizers";
    }

    if (selectedCategory === "Gardening Tools") {
        filterName = "Garden Tools";
    }


    filterButtons.forEach(function(button) {

        if (button.textContent.trim() === filterName) {
            button.click();
        }

    });

}


/* =========================
   ADD TO WISHLIST
========================= */

const wishlistButtons =
    document.querySelectorAll(".wishlist-button");

wishlistButtons.forEach(function(button, index) {

    button.addEventListener("click", function() {

        /* CHECK LOGIN */

        const user =
            getCurrentUser();

        if (!user) {

            alert(
                "Please login before adding products to your wishlist."
            );

            window.location.href =
                "login.html";

            return;
        }

        /* GET PRODUCT */

        const product =
            products[index];

        if (!product) {
            return;
        }

        /* USER-SPECIFIC WISHLIST KEY */

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

        /* CHECK IF ALREADY SAVED */

        const alreadySaved =
            wishlist.some(function(item) {
                return item.name === product.name;
            });

        if (alreadySaved) {

            alert(
                "This product is already in your wishlist."
            );

            return;
        }

        /* ADD PRODUCT */

        wishlist.push(product);

        /* SAVE USER-SPECIFIC WISHLIST */

        localStorage.setItem(
            wishlistKey,
            JSON.stringify(wishlist)
        );

        /* CHANGE HEART ICON */

        const icon =
            button.querySelector("i");

        if (icon) {

            icon.classList.remove(
                "bi-heart"
            );

            icon.classList.add(
                "bi-heart-fill"
            );
        }

        button.title =
            "Added to Wishlist";
    });
});

/* =========================
   ADD TO CART
========================= */

const addButtons =
    document.querySelectorAll(".add-cart");

addButtons.forEach(function(button, index) {

    button.addEventListener("click", function() {

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

        const product =
            products[index];

        if (!product) {
            return;
        }

        const cartKey =
            getCartKey();

        let cart =
            JSON.parse(
                localStorage.getItem(cartKey)
            ) || [];

        const existingProduct =
            cart.find(function(item) {
                return item.name === product.name;
            });

        if (existingProduct) {

            existingProduct.quantity =
                Number(existingProduct.quantity || 0) + 1;

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
    });
});

updateCartCount();


updateCartCount();


/* =========================
   PRODUCT DETAILS
========================= */

productCards.forEach(function(card, index) {

    const productImage =
        card.querySelector(".shop-product-image");

    const productInfo =
        card.querySelector(".shop-product-info");


    function openProductDetails(event) {

        const product = products[index];

        if (!product) {
            return;
        }

        window.location.href =
            "product-details.html?product=" +
            encodeURIComponent(product.name);
    }


    if (productImage) {

        productImage.addEventListener(
            "click",
            openProductDetails
        );

    }


    if (productInfo) {

        productInfo.addEventListener(
            "click",
            function(event) {

                if (
                    event.target.closest(".add-cart") ||
                    event.target.closest(".wishlist-button")
                ) {
                    return;
                }

                openProductDetails(event);
            }
        );

    }

});