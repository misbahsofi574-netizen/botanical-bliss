let allProducts = [];


/* =========================================================
   PAGE LOAD
========================================================= */
document.addEventListener("DOMContentLoaded", async () => {

    setupLogout();

    setupProductModal();

    setupProductControls();

    await loadProducts();

    const editProductId =
        sessionStorage.getItem("editProductId");

    if (editProductId) {

        sessionStorage.removeItem("editProductId");

        editProduct(editProductId);
    }

});
/* =========================================================
   LOAD PRODUCTS
========================================================= */

async function loadProducts() {

    const productsBody =
        document.getElementById("productsBody");

    try {

        const token =
            localStorage.getItem("token");


        if (!token) {

            window.location.href =
                "../login.html";

            return;

        }


        if (productsBody) {

            productsBody.innerHTML = `
                <tr>
                    <td
                        colspan="6"
                        class="orders-empty"
                    >
                        <i class="bi bi-hourglass-split"></i>
                        Loading products...
                    </td>
                </tr>
            `;

        }


        const response = await fetch(
            "http://localhost:5000/api/admin/products",
            {
                headers: {
                    Authorization:
                        "Bearer " + token
                }
            }
        );


        const products =
            await response.json();


        if (!response.ok) {

            console.error(
                "Failed to load products:",
                products
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


        allProducts =
            Array.isArray(products)
                ? products
                : [];


        updateProductsCount();
        populateCategoryFilter();
        renderProducts();


    } catch (error) {

        console.error(
            "Products error:",
            error
        );


        if (productsBody) {

            productsBody.innerHTML = `
                <tr>
                    <td
                        colspan="6"
                        class="orders-empty"
                    >

                        <i class="bi bi-exclamation-circle"></i>

                        <strong>
                            Unable to load products
                        </strong>

                        <span>
                            Please try again.
                        </span>

                        <button
                            type="button"
                            class="retry-orders-btn"
                            onclick="loadProducts()"
                        >
                            <i class="bi bi-arrow-clockwise"></i>
                            Try Again
                        </button>

                    </td>
                </tr>
            `;

        }

    }

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const productsBody =
        document.getElementById(
            "productsBody"
        );


    if (!productsBody) {
        return;
    }


    const searchInput =
        document.getElementById(
            "productSearchInput"
        );


    const categoryFilter =
        document.getElementById(
            "productCategoryFilter"
        );


    const stockFilter =
        document.getElementById(
            "productStockFilter"
        );


    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const selectedStock =
        stockFilter
            ? stockFilter.value
            : "all";


    const filteredProducts =
        allProducts.filter(product => {

            const name =
                String(product.name || "")
                    .toLowerCase();


            const category =
                String(product.category || "")
                    .toLowerCase();


            const matchesSearch =
                !searchText ||
                name.includes(searchText) ||
                category.includes(searchText);


            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;


            const stock =
                Number(product.stock || 0);


            let matchesStock = true;


            if (
                selectedStock === "in-stock"
            ) {

                matchesStock =
                    stock > 5;

            }


            if (
                selectedStock === "low-stock"
            ) {

                matchesStock =
                    stock > 0 &&
                    stock <= 5;

            }


            if (
                selectedStock === "out-of-stock"
            ) {

                matchesStock =
                    stock === 0;

            }


            return (
                matchesSearch &&
                matchesCategory &&
                matchesStock
            );

        });


    if (!filteredProducts.length) {

        productsBody.innerHTML = `
            <tr>

                <td
                    colspan="6"
                    class="orders-empty"
                >

                    <i class="bi bi-box-seam"></i>

                    <strong>
                        No products found
                    </strong>

                    <span>
                        Try changing your search or filters.
                    </span>

                </td>

            </tr>
        `;

        return;

    }


    productsBody.innerHTML =
        filteredProducts.map(product => {

            const stock =
                Number(product.stock || 0);


            let stockClass =
                "product-stock-good";


            let stockText =
                `${stock}`;


            if (stock === 0) {

                stockClass =
                    "product-stock-out";

                stockText =
                    "Out of stock";

            }
            else if (stock <= 5) {

                stockClass =
                    "product-stock-low";

                stockText =
                    `${stock} left`;

            }


            const status =
                product.status || "Inactive";


            const statusClass =
                status.toLowerCase();


            return `
                <tr>

                    <!-- PRODUCT -->

                    <td>

                        <div class="admin-product-cell">

                            <div class="admin-product-image">

                                ${
                                    product.image
                                        ? `
                                            <img
                                                src="../${escapeHTML(product.image)}"
                                                alt="${escapeHTML(product.name || "Product")}"
                                                onerror="this.style.display='none';"
                                            >
                                        `
                                        : `
                                            <i class="bi bi-box-seam"></i>
                                        `
                                }

                            </div>

                            <div>

                                <strong>
                                    ${escapeHTML(product.name || "Unnamed Product")}
                                </strong>

                                ${
                                    product.description
                                        ? `
                                            <span>
                                                ${escapeHTML(
                                                    product.description
                                                        .substring(0, 55)
                                                )}${
                                                    product.description.length > 55
                                                        ? "..."
                                                        : ""
                                                }
                                            </span>
                                        `
                                        : ""
                                }

                            </div>

                        </div>

                    </td>


                    <!-- CATEGORY -->

                    <td>

                        <span class="product-category">
                            ${escapeHTML(
                                product.category || "Uncategorized"
                            )}
                        </span>

                    </td>


                    <!-- PRICE -->

                    <td>

                        <strong class="product-price">
                            ₹${Number(
                                product.price || 0
                            ).toLocaleString("en-IN")}
                        </strong>

                    </td>


                    <!-- STOCK -->

                    <td>

                        <span class="${stockClass}">
                            ${stockText}
                        </span>

                    </td>


                    <!-- STATUS -->

                    <td>

                        <span
                            class="product-status ${statusClass}"
                        >
                            ${escapeHTML(status)}
                        </span>

                    </td>


                    <!-- ACTION -->

                    <td>

                        <div class="product-actions">

                            <button
                                type="button"
                                class="order-action-btn product-edit-btn"
                                title="Edit Product"
                                onclick="editProduct('${escapeHTML(product._id)}')"
                            >

                                <i class="bi bi-pencil"></i>

                            </button>


                            <button
                                type="button"
                                class="order-action-btn product-delete-btn"
                                title="Delete Product"
                                onclick="deleteProduct('${escapeHTML(product._id)}')"
                            >

                                <i class="bi bi-trash3"></i>

                            </button>

                        </div>

                    </td>

                </tr>
            `;

        }).join("");

}


/* =========================================================
   PRODUCT COUNT
========================================================= */

function updateProductsCount() {

    const count =
        document.getElementById(
            "productsCount"
        );


    if (count) {

        count.textContent =
            allProducts.length;

    }

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function populateCategoryFilter() {

    const filter =
        document.getElementById(
            "productCategoryFilter"
        );


    if (!filter) {
        return;
    }


    const currentValue =
        filter.value;


    const categories =
        [
            ...new Set(
                allProducts
                    .map(product =>
                        product.category
                    )
                    .filter(Boolean)
            )
        ]
        .sort();


    filter.innerHTML = `
        <option value="all">
            All Categories
        </option>
    `;


    categories.forEach(category => {

        const option =
            document.createElement("option");


        option.value =
            category;


        option.textContent =
            category;


        filter.appendChild(option);

    });


    if (
        categories.includes(currentValue)
    ) {

        filter.value =
            currentValue;

    }

}


/* =========================================================
   SEARCH + FILTER + REFRESH
========================================================= */

function setupProductControls() {

    const searchInput =
        document.getElementById(
            "productSearchInput"
        );


    const categoryFilter =
        document.getElementById(
            "productCategoryFilter"
        );


    const stockFilter =
        document.getElementById(
            "productStockFilter"
        );


    const refreshButton =
        document.getElementById(
            "refreshProductsBtn"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderProducts
        );

    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            renderProducts
        );

    }


    if (stockFilter) {

        stockFilter.addEventListener(
            "change",
            renderProducts
        );

    }


    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            async () => {

                refreshButton.disabled = true;


                refreshButton.innerHTML = `
                    <i class="bi bi-arrow-repeat"></i>
                    Refreshing...
                `;


                await loadProducts();


                refreshButton.disabled = false;


                refreshButton.innerHTML = `
                    <i class="bi bi-arrow-clockwise"></i>
                    Refresh
                `;

            }
        );

    }

}


/* =========================================================
   PRODUCT MODAL
========================================================= */

function setupProductModal() {

    const modal =
        document.getElementById(
            "productModal"
        );


    const addButton =
        document.getElementById(
            "addProductBtn"
        );


    const closeButton =
        document.getElementById(
            "closeProductModal"
        );


    const cancelButton =
        document.getElementById(
            "cancelProductBtn"
        );


    const form =
        document.getElementById(
            "productForm"
        );


    if (
        !modal ||
        !addButton ||
        !closeButton ||
        !cancelButton ||
        !form
    ) {
        return;
    }


    addButton.addEventListener(
        "click",
        () => {

            openAddProductModal();

        }
    );


    closeButton.addEventListener(
        "click",
        () => {

            modal.classList.remove(
                "show"
            );

        }
    );


    cancelButton.addEventListener(
        "click",
        () => {

            modal.classList.remove(
                "show"
            );

        }
    );


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


    form.addEventListener(
        "submit",
        saveProduct
    );

}


/* =========================================================
   ADD PRODUCT MODAL
========================================================= */

function openAddProductModal() {

    document.getElementById(
        "productModalTitle"
    ).textContent =
        "Add Product";


    document.getElementById(
        "productForm"
    ).reset();


    document.getElementById(
        "productId"
    ).value = "";


    document.getElementById(
        "productStatus"
    ).value =
        "Active";


    document.getElementById(
        "productModal"
    ).classList.add(
        "show"
    );

}


/* =========================================================
   SAVE PRODUCT
========================================================= */

async function saveProduct(event) {

    event.preventDefault();


    try {

        const token =
            localStorage.getItem("token");


        if (!token) {

            window.location.href =
                "../login.html";

            return;

        }


        const productId =
            document.getElementById(
                "productId"
            ).value;


        const productData = {

            name:
                document.getElementById(
                    "productName"
                ).value.trim(),

            category:
                document.getElementById(
                    "productCategory"
                ).value.trim(),

            price:
                Number(
                    document.getElementById(
                        "productPrice"
                    ).value
                ),

            stock:
                Number(
                    document.getElementById(
                        "productStock"
                    ).value
                ),

            image:
                document.getElementById(
                    "productImage"
                ).value.trim(),

            description:
                document.getElementById(
                    "productDescription"
                ).value.trim(),

            status:
                document.getElementById(
                    "productStatus"
                ).value

        };


        const url =
            productId

                ? `http://localhost:5000/api/admin/products/${productId}`

                : "http://localhost:5000/api/admin/products";


        const method =
            productId
                ? "PUT"
                : "POST";


        const response =
            await fetch(
                url,
                {
                    method: method,

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            "Bearer " + token

                    },

                    body:
                        JSON.stringify(
                            productData
                        )

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            alert(
                result.message ||
                "Failed to save product"
            );

            return;

        }


        alert(
            productId
                ? "Product updated successfully!"
                : "Product added successfully!"
        );


        document.getElementById(
            "productModal"
        ).classList.remove(
            "show"
        );


        await loadProducts();


    } catch (error) {

        console.error(
            "Save product error:",
            error
        );


        alert(
            "Something went wrong while saving the product."
        );

    }

}


/* =========================================================
   EDIT PRODUCT
========================================================= */

async function editProduct(productId) {

    try {

        const token =
            localStorage.getItem("token");


        if (!token) {

            window.location.href =
                "../login.html";

            return;

        }


        const response =
            await fetch(
                "http://localhost:5000/api/admin/products",
                {
                    headers: {
                        Authorization:
                            "Bearer " + token
                    }
                }
            );


        const products =
            await response.json();


        if (!response.ok) {

            alert(
                products.message ||
                "Unable to load product."
            );

            return;

        }


        const product =
            products.find(
                item =>
                    String(item._id) ===
                    String(productId)
            );


        if (!product) {

            alert(
                "Product not found."
            );

            return;

        }


        document.getElementById(
            "productModalTitle"
        ).textContent =
            "Edit Product";


        document.getElementById(
            "productId"
        ).value =
            product._id;


        document.getElementById(
            "productName"
        ).value =
            product.name || "";


        document.getElementById(
            "productCategory"
        ).value =
            product.category || "";


        document.getElementById(
            "productPrice"
        ).value =
            product.price || 0;


        document.getElementById(
            "productStock"
        ).value =
            product.stock || 0;


        document.getElementById(
            "productImage"
        ).value =
            product.image || "";


        document.getElementById(
            "productDescription"
        ).value =
            product.description || "";


        document.getElementById(
            "productStatus"
        ).value =
            product.status || "Active";


        document.getElementById(
            "productModal"
        ).classList.add(
            "show"
        );


    } catch (error) {

        console.error(
            "Edit product error:",
            error
        );


        alert(
            "Something went wrong while opening the product."
        );

    }

}


/* =========================================================
   DELETE PRODUCT
========================================================= */

async function deleteProduct(productId) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this product?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const token =
            localStorage.getItem("token");


        if (!token) {

            window.location.href =
                "../login.html";

            return;

        }


        const response =
            await fetch(
                `http://localhost:5000/api/admin/products/${productId}`,
                {
                    method: "DELETE",

                    headers: {

                        Authorization:
                            "Bearer " + token

                    }

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            alert(
                result.message ||
                "Failed to delete product"
            );

            return;

        }


        alert(
            "Product deleted successfully!"
        );


        await loadProducts();


    } catch (error) {

        console.error(
            "Delete product error:",
            error
        );


        alert(
            "Something went wrong while deleting the product."
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
   SECURITY HELPER
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        value ?? "";


    return div.innerHTML;

}