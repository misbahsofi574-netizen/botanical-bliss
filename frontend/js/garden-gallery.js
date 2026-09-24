console.log("GARDEN GALLERY JS LOADED");
/* =========================================================
   BOTANICAL BLISS - GARDEN GALLERY
   MongoDB Community Posts
   Image Compression + JWT Authentication
========================================================= */

const API_URL = "https://botanical-bliss-52ra.onrender.com/api/garden-posts";

const gardenPostForm = document.getElementById("gardenPostForm");
const gardenPhoto = document.getElementById("gardenPhoto");
const gardenCaption = document.getElementById("gardenCaption");
const selectedFileName = document.getElementById("selectedFileName");
const communityPosts = document.getElementById("communityPosts");


/* =========================================================
   SHOW SELECTED FILE NAME
========================================================= */

gardenPhoto.addEventListener("change", function () {

    const file = gardenPhoto.files[0];

    if (!file) {
        selectedFileName.textContent = "";
        return;
    }

    selectedFileName.textContent = "Selected: " + file.name;
});


/* =========================================================
   COMPRESS IMAGE
========================================================= */

function compressImage(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function (event) {

            const img = new Image();

            img.onload = function () {

                const canvas = document.createElement("canvas");

                const MAX_WIDTH = 700;
                const MAX_HEIGHT = 700;

                let width = img.width;
                let height = img.height;


                /* Keep original ratio */

                if (width > MAX_WIDTH) {

                    height = height * (MAX_WIDTH / width);
                    width = MAX_WIDTH;

                }

                if (height > MAX_HEIGHT) {

                    width = width * (MAX_HEIGHT / height);
                    height = MAX_HEIGHT;

                }


                canvas.width = width;
                canvas.height = height;


                const ctx = canvas.getContext("2d");

                ctx.drawImage(
                    img,
                    0,
                    0,
                    width,
                    height
                );


                /* Convert to compressed JPEG */

                const compressedImage = canvas.toDataURL(
                    "image/jpeg",
                    0.5
                );

                resolve(compressedImage);
            };


            img.onerror = function () {
                reject(new Error("Could not process image."));
            };


            img.src = event.target.result;
        };


        reader.onerror = function () {
            reject(new Error("Could not read image."));
        };


        reader.readAsDataURL(file);
    });
}


/* =========================================================
   CREATE GARDEN POST
========================================================= */

gardenPostForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const file = gardenPhoto.files[0];
    const caption = gardenCaption.value.trim();


    /* Check image */

    if (!file) {

        alert("Please choose a gardening photo.");
        return;

    }


    /* Check caption */

    if (!caption) {

        alert("Please write a caption.");
        return;

    }


    /* Check file type */

    if (!file.type.startsWith("image/")) {

        alert("Please select a valid image.");
        return;

    }


    /* Check login */

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login before sharing a garden post.");
        return;

    }


    try {

        /* Compress image */

        const imageData = await compressImage(file);


        const newPost = {

            image: imageData,
            caption: caption

        };


        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization": `Bearer ${token}`

            },

            body: JSON.stringify(newPost)

        });


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message || "Failed to create post."
            );

        }


        alert("Garden post shared successfully! 🌿");


        /* Reset form */

        gardenPostForm.reset();

        selectedFileName.textContent = "";


        /* Refresh posts */

        displayGardenPosts();


    } catch (error) {

        console.error("Create post error:", error);

        alert(
            error.message ||
            "Could not connect to Botanical Bliss server."
        );

    }

});


/* =========================================================
   DISPLAY ALL GARDEN POSTS
========================================================= */

async function displayGardenPosts() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {

            throw new Error("Failed to fetch garden posts.");

        }

        const posts = await response.json();


        communityPosts.innerHTML = "";


        if (posts.length === 0) {

            communityPosts.innerHTML = `
                <p class="text-center">
                    No community posts yet. Be the first to share your garden!
                </p>
            `;

            return;
        }


        posts.forEach(post => {

            const postElement = document.createElement("div");

            postElement.className = "community-post";


            postElement.innerHTML = `

    <div class="garden-post-header">

        <div class="garden-post-user">
            <div class="garden-user-avatar">
                <i class="bi bi-person-fill"></i>
            </div>

            <span>${escapeHTML(post.userName)}</span>
        </div>

    </div>


    <img
        src="${post.image}"
        alt="Garden Post"
        class="community-post-image"
    >


    <div class="garden-post-footer">

        <div class="garden-post-actions">

           <button
    onclick="likeGardenPost('${post._id}', this)"
    class="garden-action like-action"
    type="button"
>
    <i class="bi bi-heart"></i>
    <span>${post.likes || 0}</span>
</button>

            <button
                class="garden-action"
                type="button"
            >
                <i class="bi bi-chat"></i>
            </button>

            <button
                class="garden-action"
                type="button"
            >
                <i class="bi bi-send"></i>
            </button>

            <button
                onclick="deleteGardenPost('${post._id}')"
                class="garden-action delete-action"
                type="button"
            >
                <i class="bi bi-trash"></i>
            </button>

        </div>


        <div class="garden-post-caption">

            <strong>${escapeHTML(post.userName)}</strong>

            <span>
                ${escapeHTML(post.caption)}
            </span>

        </div>

    </div>

`;
            communityPosts.appendChild(postElement);

        });


    } catch (error) {

        console.error("Display posts error:", error);

        communityPosts.innerHTML = `
            <p class="text-center">
                Could not load community posts.
            </p>
        `;

    }

}


/* =========================================================
   LIKE GARDEN POST
========================================================= */

async function likeGardenPost(postId, button) {

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login to like a post.");
            return;
        }

        // Prevent multiple clicks while request is processing
        if (button.dataset.liking === "true") {
            return;
        }

        button.dataset.liking = "true";
        button.disabled = true;

        const response = await fetch(
            `${API_URL}/${postId}/like`,
            {
                method: "PUT",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to like post."
            );
        }

        // Update the displayed count immediately
        const count =
            button.querySelector("span");

        if (count) {
            count.textContent = data.likes;
        }

        // Change heart appearance
        const heart =
            button.querySelector("i");

        if (heart) {
            heart.classList.remove("bi-heart");
            heart.classList.add("bi-heart-fill");
        }

        button.classList.add("liked");

    } catch (error) {

        console.error(
            "Like post error:",
            error
        );

        alert(error.message);

        // Allow clicking again only if request failed
        button.disabled = false;

    }
}

/* =========================================================
   DELETE GARDEN POST
========================================================= */

async function deleteGardenPost(postId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this post?"
    );


    if (!confirmDelete) {
        return;
    }


    try {

        const token = localStorage.getItem("token");


        if (!token) {

            alert("Please login to delete a post.");
            return;

        }


        const response = await fetch(
            `${API_URL}/${postId}`,
            {

                method: "DELETE",

                headers: {

                    "Authorization": `Bearer ${token}`

                }

            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message || "Failed to delete post."
            );

        }


        alert("Garden post deleted successfully.");

        displayGardenPosts();


    } catch (error) {

        console.error("Delete post error:", error);

        alert(error.message);

    }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================================
   LOAD POSTS WHEN PAGE OPENS
========================================================= */

displayGardenPosts();
