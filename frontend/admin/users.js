
let allUsers = [];


/* =========================================================
   PAGE LOAD
========================================================= */
document.addEventListener("DOMContentLoaded", async () => {

    setupLogout();

    setupUserControls();

    setupUserModal();

    await loadUsers();


    /* =====================================================
       OPEN USER FROM ADMIN DASHBOARD
    ===================================================== */

    const viewUserId =
        sessionStorage.getItem("viewUserId");

    if (viewUserId) {

        sessionStorage.removeItem(
            "viewUserId"
        );

        viewUser(viewUserId);
    }

});

/* =========================================================
   LOAD ALL USERS
========================================================= */

async function loadUsers() {

    const usersBody =
        document.getElementById("usersBody");

    try {

        const token =
            localStorage.getItem("token");


        if (!token) {

            window.location.href =
                "../login.html";

            return;
        }


        /* Loading state */

        if (usersBody) {

            usersBody.innerHTML = `
                <tr>

                    <td
                        colspan="5"
                        class="orders-loading"
                    >

                        <i class="bi bi-arrow-repeat"></i>

                        Loading users...

                    </td>

                </tr>
            `;

        }


        const response =
            await fetch(
                "http://localhost:5000/api/admin/users",
                {
                    headers: {
                        Authorization:
                            "Bearer " + token
                    }
                }
            );


        const users =
            await response.json();


        if (!response.ok) {

            console.error(
                "Failed to load users:",
                users
            );


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

                window.location.href =
                    "../login.html";

            }

            return;
        }


        allUsers =
            Array.isArray(users)
                ? users
                : [];


        updateUsersCount();

        renderUsers();


    } catch (error) {

        console.error(
            "Users error:",
            error
        );


        if (usersBody) {

            usersBody.innerHTML = `
                <tr>

                    <td
                        colspan="5"
                        class="orders-empty"
                    >

                        <i class="bi bi-exclamation-circle"></i>

                        <strong>
                            Unable to load users
                        </strong>

                        <span>
                            Please try again.
                        </span>

                        <button
                            type="button"
                            onclick="loadUsers()"
                            class="retry-orders-btn"
                        >
                            Try Again
                        </button>

                    </td>

                </tr>
            `;

        }

    }

}


/* =========================================================
   RENDER USERS
========================================================= */

function renderUsers() {

    const usersBody =
        document.getElementById("usersBody");


    if (!usersBody) {
        return;
    }


    const searchInput =
        document.getElementById(
            "userSearchInput"
        );


    const roleFilter =
        document.getElementById(
            "userRoleFilter"
        );


    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedRole =
        roleFilter
            ? roleFilter.value
            : "all";


    /* -----------------------------------------------------
       FILTER
    ----------------------------------------------------- */

    const filteredUsers =
        allUsers.filter(user => {

            const name =
                String(
                    user.name || ""
                ).toLowerCase();


            const email =
                String(
                    user.email || ""
                ).toLowerCase();


            const matchesSearch =
                !searchText ||
                name.includes(searchText) ||
                email.includes(searchText);


            const matchesRole =
                selectedRole === "all" ||
                user.role === selectedRole;


            return (
                matchesSearch &&
                matchesRole
            );

        });


    /* -----------------------------------------------------
       EMPTY RESULT
    ----------------------------------------------------- */

    if (!filteredUsers.length) {

        usersBody.innerHTML = `
            <tr>

                <td
                    colspan="5"
                    class="orders-empty"
                >

                    <i class="bi bi-person-x"></i>

                    <strong>
                        No users found
                    </strong>

                    <span>
                        Try changing your search
                        or role filter.
                    </span>

                </td>

            </tr>
        `;

        return;
    }


    /* -----------------------------------------------------
       DISPLAY USERS
    ----------------------------------------------------- */

    usersBody.innerHTML =
        filteredUsers
            .map(user => {

                const date =
                    new Date(
                        user.createdAt
                    );


                const formattedDate =
                    date.toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }
                    );


                const userName =
                    user.name ||
                    "Unknown User";


                const role =
                    user.role ||
                    "user";


                return `

                    <tr>

                        <!-- NAME -->

                        <td>

                            <div
                                class="user-name-cell"
                            >

                                <div
                                    class="user-avatar"
                                >

                                    ${getInitials(
                                        userName
                                    )}

                                </div>

                                <strong>
                                    ${escapeHTML(
                                        userName
                                    )}
                                </strong>

                            </div>

                        </td>


                        <!-- EMAIL -->

                        <td>

                            ${escapeHTML(
                                user.email || "—"
                            )}

                        </td>


                        <!-- ROLE -->

                        <td>

                            <span
                                class="user-role ${escapeHTML(
                                    role
                                )}"
                            >

                                ${
                                    role === "admin"
                                        ? "Administrator"
                                        : "User"
                                }

                            </span>

                        </td>


                        <!-- DATE -->

                        <td>

                            ${formattedDate}

                        </td>


                        <!-- ACTION -->

                        <td>

                            <button
                                type="button"
                                class="user-view-btn"
                                onclick="viewUser('${escapeHTML(
                                    user._id || ""
                                )}')"
                            >

                                <i class="bi bi-eye"></i>

                                View

                            </button>

                        </td>

                    </tr>

                `;

            })
            .join("");

}


/* =========================================================
   USER COUNT
========================================================= */

function updateUsersCount() {

    const countElement =
        document.getElementById(
            "usersCount"
        );


    if (!countElement) {
        return;
    }


    countElement.textContent =
        allUsers.length;

}


/* =========================================================
   SEARCH / FILTER / REFRESH
========================================================= */

function setupUserControls() {

    const searchInput =
        document.getElementById(
            "userSearchInput"
        );


    const roleFilter =
        document.getElementById(
            "userRoleFilter"
        );


    const refreshButton =
        document.getElementById(
            "refreshUsersBtn"
        );


    /* Search */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                renderUsers();

            }
        );

    }


    /* Role filter */

    if (roleFilter) {

        roleFilter.addEventListener(
            "change",
            () => {

                renderUsers();

            }
        );

    }


    /* Refresh */

    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            async () => {

                refreshButton.disabled =
                    true;


                refreshButton.innerHTML = `
                    <i class="bi bi-arrow-repeat"></i>
                    Refreshing...
                `;


                await loadUsers();


                refreshButton.disabled =
                    false;


                refreshButton.innerHTML = `
                    <i class="bi bi-arrow-clockwise"></i>
                    Refresh
                `;

            }
        );

    }

}


/* =========================================================
   VIEW USER
========================================================= */

function viewUser(userId) {

    const user =
        allUsers.find(
            item =>
                String(item._id) ===
                String(userId)
        );


    if (!user) {

        alert(
            "User information could not be found."
        );

        return;
    }


    const userName =
        user.name ||
        "Unknown User";


    /* User name */

    document.getElementById(
        "modalUserName"
    ).textContent =
        userName;


    /* Email */

    document.getElementById(
        "modalUserEmail"
    ).textContent =
        user.email || "—";


    /* Role */

    document.getElementById(
        "modalUserRole"
    ).textContent =
        user.role === "admin"
            ? "Administrator"
            : "User";


    /* Registration date */

    const date =
        new Date(
            user.createdAt
        );


    document.getElementById(
        "modalUserRegistered"
    ).textContent =
        date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    /* Initials */

    document.getElementById(
        "modalUserAvatar"
    ).textContent =
        getInitials(userName);


    /* Show modal */

    document
        .getElementById("userModal")
        .classList.add("show");

}


/* =========================================================
   USER MODAL
========================================================= */

function setupUserModal() {

    const modal =
        document.getElementById(
            "userModal"
        );


    const closeButton =
        document.getElementById(
            "closeUserModal"
        );


    if (
        !modal ||
        !closeButton
    ) {
        return;
    }


    closeButton.addEventListener(
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

}


/* =========================================================
   INITIALS
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


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text ?? "";


    return div.innerHTML;

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


