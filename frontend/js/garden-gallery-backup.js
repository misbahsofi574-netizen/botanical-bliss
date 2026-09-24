/* =========================================================
   BOTANICAL BLISS - GARDEN GALLERY
   Community Garden Posts
========================================================= */

const gardenPostForm = document.getElementById("gardenPostForm");
const gardenPhoto = document.getElementById("gardenPhoto");
const gardenCaption = document.getElementById("gardenCaption");
const selectedFileName = document.getElementById("selectedFileName");
const communityPosts = document.getElementById("communityPosts");


/* =========================================================
   LOAD POSTS
========================================================= */

let gardenPosts =
    JSON.parse(localStorage.getItem("gardenPosts")) || [];


/* =========================================================
   SELECT PHOTO
========================================================= */

gardenPhoto.addEventListener("change", function () {

    const file = gardenPhoto.files[0];

    if (!file) {
        selectedFileName.textContent = "";
        return;
    }

    selectedFileName.textContent =
        "Selected: " + file.name;

});


/* =========================================================
   CREATE POST
========================================================= */

gardenPostForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const file = gardenPhoto.files[0];
    const caption = gardenCaption.value.trim();


    /* Check photo */

    if (!file) {

        alert("Please choose a gardening photo.");

        return;
    }


    /* Check caption */

    if (!caption) {

        alert("Please write a caption.");

        return;
    }


    /* Check image type */

    if (!file.type.startsWith("image/")) {

        alert("Please select a valid image.");

        return;
    }


    /* Read image */

    const reader = new FileReader();


    reader.onload = function (event) {

        const newPost = {

            id: Date.now(),

            image: event.target.result,

            caption: caption,

            date: new Date().toLocaleDateString(),

            likes: 0

        };


        /* Add newest post first */

        gardenPosts.unshift(newPost);


        /* Save posts */

        localStorage.setItem(
            "gardenPosts",
            JSON.stringify(gardenPosts)
        );


        /* Reset form */

        gardenPostForm.reset();

        selectedFileName.textContent = "";


        /* Display posts */

        displayGardenPosts();

    };


    reader.readAsDataURL(file);

});


/* =========================================================
   DISPLAY POSTS
========================================================= */

function displayGardenPosts() {

    communityPosts.innerHTML = "";


    /* No posts */

    if (gardenPosts.length === 0) {

        communityPosts.innerHTML = `

            <div class="community-empty">

                <i class="bi bi-flower1"></i>

                <h3>No garden posts yet</h3>

                <p>
                    Be the first gardener to share
                    your beautiful garden!
                </p>

            </div>

        `;

        return;
    }


    /* Display every post */

    gardenPosts.forEach(function (post) {

        const postCard = document.createElement("div");

        postCard.className = "community-post";


        postCard.innerHTML = `

            <img
                src="${post.image}"
                alt="Community garden"
                class="community-post-image"
            >

            <div class="community-post-content">

                <div class="community-post-user">

                    <i class="bi bi-person"></i>

                    <div>

                        <strong>
                            Botanical Bliss Gardener
                        </strong>

                        <span class="community-post-date">
                            ${post.date}
                        </span>

                    </div>

                </div>


                <p class="community-post-caption">
                    ${escapeHTML(post.caption)}
                </p>


                <div class="community-post-actions">

                    <button
                        class="community-like-button"
                        onclick="likeGardenPost(${post.id})">

                        <i class="bi bi-heart"></i>

                        <span>
                            ${post.likes}
                        </span>

                    </button>


                    <button
                        class="community-delete-button"
                        onclick="deleteGardenPost(${post.id})">

                        <i class="bi bi-trash"></i>

                        Delete

                    </button>

                </div>

            </div>

        `;


        communityPosts.appendChild(postCard);

    });

}


/* =========================================================
   LIKE POST
========================================================= */

function likeGardenPost(postId) {

    const post = gardenPosts.find(
        function (item) {
            return item.id === postId;
        }
    );


    if (!post) {
        return;
    }


    post.likes++;


    localStorage.setItem(
        "gardenPosts",
        JSON.stringify(gardenPosts)
    );


    displayGardenPosts();

}


/* =========================================================
   DELETE POST
========================================================= */

function deleteGardenPost(postId) {

    const confirmDelete =
        confirm("Are you sure you want to delete this post?");


    if (!confirmDelete) {
        return;
    }


    gardenPosts =
        gardenPosts.filter(
            function (post) {
                return post.id !== postId;
            }
        );


    localStorage.setItem(
        "gardenPosts",
        JSON.stringify(gardenPosts)
    );


    displayGardenPosts();

}


/* =========================================================
   SECURITY
========================================================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================================
   INITIAL DISPLAY
========================================================= */

displayGardenPosts();