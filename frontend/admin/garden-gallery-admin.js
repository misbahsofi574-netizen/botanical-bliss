let allGalleryPosts = [];
let selectedGalleryPostId = null;


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadAdminGallery();
    setupGalleryControls();
    setupGalleryModal();
    setupLogout();

});


/* =========================================================
   LOAD GALLERY
========================================================= */

async function loadAdminGallery() {

    const gallery = document.getElementById("adminGallery");

    if (!gallery) {
        return;
    }

    gallery.innerHTML = `
        <div class="gallery-loading">
            <i class="bi bi-hourglass-split"></i>
            <p>Loading gallery posts...</p>
        </div>
    `;


    try {

        const response = await fetch(
            "http://localhost:5000/api/garden-posts"
        );

        const posts = await response.json();


        if (!response.ok) {

            console.error("Gallery error:", posts);

            gallery.innerHTML = `
                <div class="gallery-empty">
                    <i class="bi bi-exclamation-circle"></i>
                    <strong>Unable to load gallery</strong>
                    <p>Please try again.</p>

                    <button
                        type="button"
                        class="gallery-refresh-btn"
                        onclick="loadAdminGallery()"
                    >
                        <i class="bi bi-arrow-clockwise"></i>
                        Try Again
                    </button>
                </div>
            `;

            return;
        }


        console.log("Garden posts:", posts);


        allGalleryPosts = Array.isArray(posts)
            ? posts
            : [];


        updateGalleryCount();
        renderGallery();


    } catch (error) {

        console.error(
            "Admin Gallery Error:",
            error
        );


        gallery.innerHTML = `
            <div class="gallery-empty">
                <i class="bi bi-wifi-off"></i>
                <strong>Something went wrong</strong>
                <p>Unable to connect to the gallery.</p>

                <button
                    type="button"
                    class="gallery-refresh-btn"
                    onclick="loadAdminGallery()"
                >
                    <i class="bi bi-arrow-clockwise"></i>
                    Try Again
                </button>
            </div>
        `;

    }

}


/* =========================================================
   RENDER GALLERY
========================================================= */

function renderGallery() {

    const gallery =
        document.getElementById("adminGallery");

    if (!gallery) {
        return;
    }


    const searchInput =
        document.getElementById("gallerySearchInput");


    const searchText =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


    const filteredPosts =
        allGalleryPosts.filter(post => {

            const userName =
                String(post.userName || "")
                    .toLowerCase();

            const caption =
                String(post.caption || "")
                    .toLowerCase();


            return (
                !searchText ||
                userName.includes(searchText) ||
                caption.includes(searchText)
            );

        });


    if (!filteredPosts.length) {

        gallery.innerHTML = `
            <div class="gallery-empty">
                <i class="bi bi-images"></i>
                <strong>No posts found</strong>
                <p>
                    ${
                        allGalleryPosts.length
                            ? "Try changing your search."
                            : "No garden posts have been shared yet."
                    }
                </p>
            </div>
        `;

        return;
    }


    gallery.innerHTML = filteredPosts.map(post => {

        const date =
            new Date(post.createdAt);


        const formattedDate =
            isNaN(date.getTime())
                ? "Unknown date"
                : date.toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );


        const userName =
            post.userName || "User";


        const caption =
            post.caption || "No caption added";


        const likes =
            post.likes || 0;


        const postId =
            post._id || "";


        return `
            <article class="gallery-admin-card">

                <div class="gallery-admin-image">

                    <img
                        src="${escapeHTML(post.image || "")}"
                        alt="Garden post shared by ${escapeHTML(userName)}"
                        onerror="this.style.display='none';"
                    >

                    <button
                        type="button"
                        class="gallery-view-btn"
                        onclick="viewGalleryPost('${escapeHTML(postId)}')"
                    >
                        <i class="bi bi-eye"></i>
                        View
                    </button>

                </div>


                <div class="gallery-admin-content">

                    <div class="gallery-admin-user">

                        <div class="gallery-admin-user-icon">
                            <i class="bi bi-person"></i>
                        </div>

                        <div>
                            <strong>
                                ${escapeHTML(userName)}
                            </strong>
                        </div>

                    </div>


                    <p class="gallery-admin-caption">
                        ${escapeHTML(caption)}
                    </p>


                    <div class="gallery-admin-meta">

                        <span class="gallery-admin-likes">

                            <i class="bi bi-heart"></i>

                            ${likes} likes

                            &nbsp; • &nbsp;

                            ${formattedDate}

                        </span>


                        <button
                            type="button"
                            class="gallery-admin-delete"
                            title="Delete Post"
                            onclick="deleteGalleryPost('${escapeHTML(postId)}')"
                        >
                            <i class="bi bi-trash3"></i>
                        </button>

                    </div>

                </div>

            </article>
        `;

    }).join("");

}


/* =========================================================
   UPDATE POST COUNT
========================================================= */

function updateGalleryCount() {

    const count =
        document.getElementById(
            "galleryPostCount"
        );


    if (count) {

        count.textContent =
            allGalleryPosts.length;

    }

}


/* =========================================================
   SEARCH + REFRESH
========================================================= */

function setupGalleryControls() {

    const searchInput =
        document.getElementById(
            "gallerySearchInput"
        );


    const refreshButton =
        document.getElementById(
            "refreshGalleryBtn"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderGallery
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


                await loadAdminGallery();


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
   VIEW POST
========================================================= */

function viewGalleryPost(postId) {

    const post =
        allGalleryPosts.find(
            item =>
                String(item._id) === String(postId)
        );


    if (!post) {

        alert(
            "Post information could not be found."
        );

        return;
    }


    selectedGalleryPostId =
        post._id;


    const modal =
        document.getElementById(
            "galleryViewModal"
        );


    const image =
        document.getElementById(
            "modalGalleryImage"
        );


    const user =
        document.getElementById(
            "modalGalleryUser"
        );


    const dateElement =
        document.getElementById(
            "modalGalleryDate"
        );


    const caption =
        document.getElementById(
            "modalGalleryCaption"
        );


    const likes =
        document.getElementById(
            "modalGalleryLikes"
        );


    const avatar =
        document.getElementById(
            "modalGalleryAvatar"
        );


    if (!modal) {
        return;
    }


    const userName =
        post.userName || "User";


    const date =
        new Date(post.createdAt);


    const formattedDate =
        isNaN(date.getTime())
            ? "Unknown date"
            : date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );


    image.src =
        post.image || "";


    image.alt =
        `Garden post shared by ${userName}`;


    user.textContent =
        userName;


    dateElement.textContent =
        formattedDate;


    caption.textContent =
        post.caption || "No caption added";


    likes.textContent =
        post.likes || 0;


    avatar.textContent =
        getInitials(userName);


    modal.classList.add("show");

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function setupGalleryModal() {

    const modal =
        document.getElementById(
            "galleryViewModal"
        );


    const closeButton =
        document.getElementById(
            "closeGalleryModal"
        );


    const deleteButton =
        document.getElementById(
            "modalGalleryDelete"
        );


    if (!modal || !closeButton) {
        return;
    }


    closeButton.addEventListener(
        "click",
        () => {

            modal.classList.remove("show");

        }
    );


    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal) {

                modal.classList.remove("show");

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("show")
            ) {

                modal.classList.remove("show");

            }

        }
    );


    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            () => {

                if (selectedGalleryPostId) {

                    deleteGalleryPost(
                        selectedGalleryPostId
                    );

                }

            }
        );

    }

}


/* =========================================================
   DELETE POST
========================================================= */

async function deleteGalleryPost(postId) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this garden post?"
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
                `http://localhost:5000/api/garden-posts/${postId}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            "Bearer " + token
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Unable to delete post."
            );

            return;
        }


        alert(
            "Garden post deleted successfully."
        );


        const modal =
            document.getElementById(
                "galleryViewModal"
            );


        if (modal) {

            modal.classList.remove("show");

        }


        selectedGalleryPostId = null;


        await loadAdminGallery();


    } catch (error) {

        console.error(
            "Delete gallery post error:",
            error
        );


        alert(
            "Something went wrong while deleting the post."
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

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href =
                "../login.html";

        }
    );

}


/* =========================================================
   HELPERS
========================================================= */

function getInitials(name) {

    return String(name)
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(
            word =>
                word
                    .charAt(0)
                    .toUpperCase()
        )
        .join("");

}


function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        value ?? "";


    return div.innerHTML;

}