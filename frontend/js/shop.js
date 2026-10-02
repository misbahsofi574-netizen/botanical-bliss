console.log("NEW SHOP JS IS RUNNING");

let products = [];


/* =========================================================
   LOAD PRODUCTS FROM MONGODB
========================================================= */

async function loadProducts() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/products"
        );

        const data = await response.json();

        if (!response.ok) {

            console.error(
                "Failed to load products:",
                data
            );

            return;
        }

        products = data;

        console.log(
            "PRODUCTS FROM MONGODB:",
            products
        );

        renderProducts();

        /* =================================================
           APPLY CATEGORY FROM URL
        ================================================= */

        const urlParams =
            new URLSearchParams(
                window.location.search
            );

        const categoryFromURL =
            urlParams.get("category");

        if (categoryFromURL) {

            console.log(
                "CATEGORY FROM URL:",
                categoryFromURL
            );

            const advancedCategory =
                document.getElementById(
                    "advancedCategory"
                );

            if (advancedCategory) {

                const matchingOption =
                    Array.from(
                        advancedCategory.options
                    ).find(function(option) {

                        return (
                            option.value
                                .trim()
                                .toLowerCase() ===
                            categoryFromURL
                                .trim()
                                .toLowerCase()
                        );

                    });

                if (matchingOption) {

                    advancedCategory.value =
                        matchingOption.value;

                    applyAdvancedFilters();

                }

            }

            /* =================================================
               UPDATE SHOP HEADING
            ================================================= */

            const shopHeading =
                document.querySelector(
                    ".shop-heading h1"
                );

            if (shopHeading) {

                shopHeading.textContent =
                    categoryFromURL;

            }

            const shopDescription =
                document.querySelector(
                    ".shop-heading p"
                );

            if (shopDescription) {

                shopDescription.textContent =
                    `Showing products from ${categoryFromURL}.`;

            }

        }

    }

    catch (error) {

        console.error(
            "Product loading error:",
            error
        );

    }

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(productList = products) {

    const productGrid =
        document.querySelector(
            ".shop-products-grid"
        );

    if (!productGrid) {
        return;
    }


    productGrid.innerHTML =
        productList.map(function(product) {

            /* =================================================
               PRODUCT CATEGORY STYLING
            ================================================= */

            let imageClass =
                "plant-image";

            let iconClass =
                "bi-flower1";

            if (
                product.category === "Seeds"
            ) {

                imageClass =
                    "seed-image";

                iconClass =
                    "bi-flower2";

            }

            else if (
                product.category === "Organic Care"
            ) {

                imageClass =
                    "fertilizer-image";

                iconClass =
                    "bi-droplet";

            }

            else if (
                product.category === "Gardening Tools"
            ) {

                imageClass =
                    "tools-image";

                iconClass =
                    "bi-tools";

            }


            /* =================================================
               STOCK STATUS
            ================================================= */

            const stock =
                Number(
                    product.stock ?? 0
                );

            const isOutOfStock =
                stock <= 0;


            /* =================================================
               ADD TO CART BUTTON
            ================================================= */

            const cartButton =
                isOutOfStock

                    ? `
                        <button
                            class="add-cart out-of-stock-button"
                            title="Out of Stock"
                            disabled
                        >
                            <i class="bi bi-x-circle"></i>
                        </button>
                      `

                    : `
                        <button
                            class="add-cart"
                            title="Add to Cart"
                        >
                            <i class="bi bi-cart-plus"></i>
                        </button>
                      `;


            /* =================================================
               STOCK BADGE
            ================================================= */

            const stockBadge =
                isOutOfStock

                    ? `
                        <span class="shop-stock-badge out-of-stock">
                            Out of Stock
                        </span>
                      `

                    : stock <= 5

                        ? `
                            <span class="shop-stock-badge low-stock">
                                Only ${stock} left
                            </span>
                          `

                        : "";


            /* =================================================
               PRODUCT CARD
            ================================================= */

            return `

                <article
                    class="shop-product-card
                    ${isOutOfStock
                        ? "product-out-of-stock"
                        : ""}"
                    data-product-id="${product._id || ""}"
                >

                    <!-- PRODUCT IMAGE -->

                    <div
                        class="shop-product-image
                        ${imageClass}"
                    >

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                        <!-- STOCK BADGE -->

                        ${stockBadge}

                        <!-- WISHLIST -->

                        <button
                            class="wishlist-button"
                            title="Add to Wishlist"
                        >
                            <i class="bi bi-heart"></i>
                        </button>

                    </div>


                    <!-- PRODUCT INFORMATION -->

                    <div class="shop-product-info">

                        <p class="shop-product-category">
                            ${product.category}
                        </p>

                        <h3>
                            ${product.name}
                        </h3>

                        <div class="shop-product-bottom">

                            <strong>
                                ₹${Number(
                                    product.price || 0
                                ).toLocaleString("en-IN")}
                            </strong>

                            ${cartButton}

                        </div>

                    </div>

                </article>

            `;

        }).join("");


    /* =================================================
       UPDATE PRODUCT COUNT
    ================================================= */

    const productCount =
        document.getElementById(
            "productCount"
        );

    if (productCount) {

        productCount.textContent =
            `${productList.length} ${
                productList.length === 1
                    ? "Product"
                    : "Products"
            }`;

    }


    setupProductInteractions();

    updateCartCount();

}


/* =========================================================
   GET CURRENT USER
========================================================= */

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("user")
    ) || null;

}


/* =========================================================
   CART
========================================================= */

function getCartKey() {

    const currentUser =
        getCurrentUser();

    if (!currentUser) {
        return null;
    }

    const currentUserId =
        currentUser._id ||
        currentUser.id ||
        currentUser.email;

    return `cart_${currentUserId}`;

}


function getCart() {

    const cartKey =
        getCartKey();

    if (!cartKey) {
        return [];
    }

    return JSON.parse(
        localStorage.getItem(cartKey)
    ) || [];

}


function updateCartCount() {

    const cart =
        getCart();

    const count =
        cart.reduce(
            function(total, item) {

                return (
                    total +
                    Number(
                        item.quantity || 0
                    )
                );

            },
            0
        );

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    if (cartCount) {

        cartCount.textContent =
            count;

    }

}


/* =========================================================
   WISHLIST
========================================================= */

function getWishlistKey() {

    const currentUser =
        getCurrentUser();

    if (!currentUser) {
        return null;
    }

    const currentUserId =
        currentUser._id ||
        currentUser.id ||
        currentUser.email;

    return `wishlist_${currentUserId}`;

}


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


/* =========================================================
   FIND PRODUCT FOR CARD
   IMPORTANT FOR SORTING/FILTERING
========================================================= */

function getProductForCard(card) {

    const productId =
        card.dataset.productId;

    if (!productId) {
        return null;
    }

    return products.find(
        function(product) {

            return String(
                product._id
            ) === String(
                productId
            );

        }
    ) || null;

}


/* =========================================================
   ADVANCED FILTERS
========================================================= */

function applyAdvancedFilters() {

    const productSearch =
        document.getElementById(
            "productSearch"
        );

    const advancedCategory =
        document.getElementById(
            "advancedCategory"
        );

    const priceFilter =
        document.getElementById(
            "priceFilter"
        );

    const stockFilter =
        document.getElementById(
            "stockFilter"
        );

    const sortProducts =
        document.getElementById(
            "sortProducts"
        );


    const searchText =
        productSearch?.value
            .toLowerCase()
            .trim() || "";


    const selectedCategory =
        advancedCategory?.value ||
        "all";


    const selectedPrice =
        priceFilter?.value ||
        "all";


    const selectedStock =
        stockFilter?.value ||
        "all";


    const selectedSort =
        sortProducts?.value ||
        "default";


    /* =================================================
       FILTER PRODUCTS
    ================================================= */

    let filteredProducts =
        products.filter(
            function(product) {

                const productName =
                    String(
                        product.name || ""
                    ).toLowerCase();


                const productCategory =
                    String(
                        product.category || ""
                    ).toLowerCase();


                /* SEARCH */

                const matchesSearch =
                    !searchText ||
                    productName.includes(
                        searchText
                    ) ||
                    productCategory.includes(
                        searchText
                    );


                /* CATEGORY */

                const matchesCategory =
                    selectedCategory === "all" ||
                    product.category ===
                        selectedCategory;


                /* PRICE */

                const price =
                    Number(
                        product.price || 0
                    );

                let matchesPrice =
                    true;


                if (
                    selectedPrice ===
                    "0-300"
                ) {

                    matchesPrice =
                        price < 300;

                }

                else if (
                    selectedPrice ===
                    "300-500"
                ) {

                    matchesPrice =
                        price >= 300 &&
                        price <= 500;

                }

                else if (
                    selectedPrice ===
                    "500-1000"
                ) {

                    matchesPrice =
                        price > 500 &&
                        price <= 1000;

                }

                else if (
                    selectedPrice ===
                    "1000+"
                ) {

                    matchesPrice =
                        price > 1000;

                }


                /* STOCK */

                const stock =
                    Number(
                        product.stock ?? 0
                    );

                let matchesStock =
                    true;


                if (
                    selectedStock ===
                    "in-stock"
                ) {

                    matchesStock =
                        stock > 5;

                }

                else if (
                    selectedStock ===
                    "low-stock"
                ) {

                    matchesStock =
                        stock > 0 &&
                        stock <= 5;

                }

                else if (
                    selectedStock ===
                    "out-of-stock"
                ) {

                    matchesStock =
                        stock <= 0;

                }


                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesPrice &&
                    matchesStock
                );

            }
        );


    /* =================================================
       SORT PRODUCTS
    ================================================= */

    if (
        selectedSort ===
        "price-low"
    ) {

        filteredProducts.sort(
            function(a, b) {

                return (
                    Number(a.price || 0) -
                    Number(b.price || 0)
                );

            }
        );

    }

    else if (
        selectedSort ===
        "price-high"
    ) {

        filteredProducts.sort(
            function(a, b) {

                return (
                    Number(b.price || 0) -
                    Number(a.price || 0)
                );

            }
        );

    }

    else if (
        selectedSort ===
        "name-az"
    ) {

        filteredProducts.sort(
            function(a, b) {

                return String(
                    a.name || ""
                ).localeCompare(
                    String(
                        b.name || ""
                    )
                );

            }
        );

    }

    else if (
        selectedSort ===
        "name-za"
    ) {

        filteredProducts.sort(
            function(a, b) {

                return String(
                    b.name || ""
                ).localeCompare(
                    String(
                        a.name || ""
                    )
                );

            }
        );

    }


    /* =================================================
       UPDATE PRODUCT COUNT
    ================================================= */

    const productCount =
        document.getElementById(
            "productCount"
        );

    if (productCount) {

        productCount.textContent =
            `${filteredProducts.length} ${
                filteredProducts.length === 1
                    ? "Product"
                    : "Products"
            }`;

    }


    /* =================================================
       RENDER FILTERED PRODUCTS
    ================================================= */

    renderProducts(
        filteredProducts
    );

}


/* =========================================================
   PRODUCT INTERACTIONS
========================================================= */

function setupProductInteractions() {

    const productCards =
        document.querySelectorAll(
            ".shop-product-card"
        );


    /* =================================================
       SEARCH
    ================================================= */

    const productSearch =
        document.getElementById(
            "productSearch"
        );

    if (productSearch) {

        productSearch.oninput =
            function() {

                applyAdvancedFilters();

            };

    }


    /* =================================================
       ADVANCED CATEGORY
    ================================================= */

    const advancedCategory =
        document.getElementById(
            "advancedCategory"
        );

    if (advancedCategory) {

        advancedCategory.onchange =
            function() {

                /* Update old category buttons */

                const filterButtons =
                    document.querySelectorAll(
                        ".shop-filter"
                    );

                filterButtons.forEach(
                    function(button) {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                const selectedValue =
                    advancedCategory.value;


                if (
                    selectedValue === "all"
                ) {

                    const allButton =
                        Array.from(
                            filterButtons
                        ).find(
                            function(button) {

                                return (
                                    button.textContent
                                        .trim() ===
                                    "All"
                                );

                            }
                        );

                    if (allButton) {

                        allButton.classList.add(
                            "active"
                        );

                    }

                }


                applyAdvancedFilters();

            };

    }


    /* =================================================
       PRICE FILTER
    ================================================= */

    const priceFilter =
        document.getElementById(
            "priceFilter"
        );

    if (priceFilter) {

        priceFilter.onchange =
            applyAdvancedFilters;

    }


    /* =================================================
       STOCK FILTER
    ================================================= */

    const stockFilter =
        document.getElementById(
            "stockFilter"
        );

    if (stockFilter) {

        stockFilter.onchange =
            applyAdvancedFilters;

    }


    /* =================================================
       SORT
    ================================================= */

    const sortProducts =
        document.getElementById(
            "sortProducts"
        );

    if (sortProducts) {

        sortProducts.onchange =
            applyAdvancedFilters;

    }


    /* =================================================
       CLEAR SEARCH
    ================================================= */

    const clearSearch =
        document.getElementById(
            "clearSearch"
        );

    if (clearSearch) {

        clearSearch.onclick =
            function() {

                if (productSearch) {

                    productSearch.value =
                        "";

                }

                applyAdvancedFilters();

            };

    }


    /* =================================================
       CLEAR ALL FILTERS
    ================================================= */

    const clearFilters =
        document.getElementById(
            "clearFilters"
        );

    if (clearFilters) {

        clearFilters.onclick =
            function() {

                if (productSearch) {

                    productSearch.value =
                        "";

                }

                if (advancedCategory) {

                    advancedCategory.value =
                        "all";

                }

                if (priceFilter) {

                    priceFilter.value =
                        "all";

                }

                if (stockFilter) {

                    stockFilter.value =
                        "all";

                }

                if (sortProducts) {

                    sortProducts.value =
                        "default";

                }


                /* Make All category active */

                const filterButtons =
                    document.querySelectorAll(
                        ".shop-filter"
                    );

                filterButtons.forEach(
                    function(button) {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                const allButton =
                    Array.from(
                        filterButtons
                    ).find(
                        function(button) {

                            return (
                                button.textContent
                                    .trim() ===
                                "All"
                            );

                        }
                    );


                if (allButton) {

                    allButton.classList.add(
                        "active"
                    );

                }


                applyAdvancedFilters();

            };

    }


    /* =================================================
       EXISTING CATEGORY BUTTONS
    ================================================= */

    const filterButtons =
        document.querySelectorAll(
            ".shop-filter"
        );


    filterButtons.forEach(
        function(button) {

            button.onclick =
                function() {

                    filterButtons.forEach(
                        function(btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const selectedCategory =
                        button.textContent.trim();


                    /* Connect old buttons
                       to advanced category */

                    if (advancedCategory) {

                        if (
                            selectedCategory ===
                            "All"
                        ) {

                            advancedCategory.value =
                                "all";

                        }

                        else if (
                            selectedCategory ===
                            "Plants"
                        ) {

                            advancedCategory.value =
                                "Indoor Plants";

                        }

                        else if (
                            selectedCategory ===
                            "Seeds"
                        ) {

                            advancedCategory.value =
                                "Seeds";

                        }

                        else if (
                            selectedCategory ===
                            "Fertilizers"
                        ) {

                            advancedCategory.value =
                                "Organic Care";

                        }

                        else if (
                            selectedCategory ===
                            "Garden Tools"
                        ) {

                            advancedCategory.value =
                                "Gardening Tools";

                        }

                    }


                    applyAdvancedFilters();

                };

        }
    );


    /* =================================================
       WISHLIST
    ================================================= */

    productCards.forEach(
        function(card) {

            const wishlistButton =
                card.querySelector(
                    ".wishlist-button"
                );

            if (!wishlistButton) {
                return;
            }


            wishlistButton.onclick =
                function(event) {

                    event.stopPropagation();


                    const currentUser =
                        getCurrentUser();


                    if (!currentUser) {

                        alert(
                            "Please login before adding products to your wishlist."
                        );

                        window.location.href =
                            "login.html";

                        return;

                    }


                    const product =
                        getProductForCard(
                            card
                        );


                    if (!product) {
                        return;
                    }


                    const wishlistKey =
                        getWishlistKey();


                    let wishlist =
                        getWishlist();


                    const existingIndex =
                        wishlist.findIndex(
                            function(item) {

                                return (
                                    item.name ===
                                    product.name
                                );

                            }
                        );


                    if (
                        existingIndex !== -1
                    ) {

                        wishlist.splice(
                            existingIndex,
                            1
                        );


                        wishlistButton.innerHTML =
                            '<i class="bi bi-heart"></i>';

                    }

                    else {

                        wishlist.push(
                            product
                        );


                        wishlistButton.innerHTML =
                            '<i class="bi bi-heart-fill"></i>';

                    }


                    localStorage.setItem(
                        wishlistKey,
                        JSON.stringify(
                            wishlist
                        )
                    );

                };

        }
    );


    /* =================================================
       ADD TO CART
    ================================================= */

    productCards.forEach(
        function(card) {

            const addCartButton =
                card.querySelector(
                    ".add-cart"
                );


            if (!addCartButton) {
                return;
            }


            addCartButton.onclick =
                function(event) {

                    event.stopPropagation();


                    const product =
                        getProductForCard(
                            card
                        );


                    if (!product) {
                        return;
                    }


                    /* STOCK CHECK */

                    const stock =
                        Number(
                            product.stock ?? 0
                        );


                    if (stock <= 0) {

                        alert(
                            `${product.name} is currently out of stock.`
                        );

                        return;

                    }


                    /* LOGIN CHECK */

                    const currentUser =
                        getCurrentUser();


                    if (!currentUser) {

                        alert(
                            "Please login before adding products to cart."
                        );

                        window.location.href =
                            "login.html";

                        return;

                    }


                    /* CART */

                    const cartKey =
                        getCartKey();


                    let cart =
                        getCart();


                    const existingItem =
                        cart.find(
                            function(item) {

                                return (
                                    item.name ===
                                    product.name
                                );

                            }
                        );


                    if (existingItem) {

                        const currentQuantity =
                            Number(
                                existingItem.quantity ||
                                0
                            );


                        /* STOCK LIMIT */

                        if (
                            currentQuantity >=
                            stock
                        ) {

                            alert(
                                `Only ${stock} unit${stock === 1 ? "" : "s"} of ${product.name} available.`
                            );

                            return;

                        }


                        existingItem.quantity =
                            currentQuantity + 1;

                    }

                    else {

                        cart.push({

                            ...product,

                            quantity: 1

                        });

                    }


                    localStorage.setItem(
                        cartKey,
                        JSON.stringify(
                            cart
                        )
                    );


                    updateCartCount();


                    alert(
                        `${product.name} added to cart.`
                    );

                };

        }
    );


    /* =================================================
       PRODUCT DETAILS
    ================================================= */

    productCards.forEach(
        function(card) {

            const productImage =
                card.querySelector(
                    ".shop-product-image"
                );


            const productInfo =
                card.querySelector(
                    ".shop-product-info"
                );


            function openProductDetails() {

                const product =
                    getProductForCard(
                        card
                    );


                if (!product) {
                    return;
                }


                /* STOCK CHECK */

                const stock =
                    Number(
                        product.stock ?? 0
                    );


                if (stock <= 0) {

                    alert(
                        `${product.name} is currently out of stock.`
                    );

                    return;

                }


                /* OPEN DETAILS */

                window.location.href =
                    "product-details.html?product=" +
                    encodeURIComponent(
                        product.name
                    );

            }


            if (productImage) {

                productImage.onclick =
                    openProductDetails;

            }


            if (productInfo) {

                productInfo.onclick =
                    function(event) {

                        if (
                            event.target.closest(
                                ".add-cart"
                            ) ||
                            event.target.closest(
                                ".wishlist-button"
                            )
                        ) {

                            return;

                        }


                        openProductDetails();

                    };

            }

        }
    );

}


/* =========================================================
   START SHOP
========================================================= */

loadProducts();