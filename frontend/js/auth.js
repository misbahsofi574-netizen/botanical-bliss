const API_URL = "http://127.0.0.1:5000/api/auth";


/* =========================
   PASSWORD VISIBILITY
========================= */

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);
    const icon = button.querySelector("i");

    if (input.type === "password") {

        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");

    } else {

        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    }
}


/* =========================
   REGISTER
========================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("registerMessage");


        // Check passwords

        if (password !== confirmPassword) {

            message.textContent = "Passwords do not match.";
            message.style.color = "#b42318";

            return;
        }


        // Send registration request

        try {

            message.textContent = "Creating your account...";
            message.style.color = "#315d3d";


            const response = await fetch(
                `${API_URL}/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();


            if (response.ok) {

                message.textContent =
                    "Account created successfully!";

                message.style.color = "#315d3d";


                registerForm.reset();


                setTimeout(() => {

                    window.location.href = "login.html";

                }, 1500);

            } else {

                message.textContent =
                    data.message || "Registration failed.";

                message.style.color = "#b42318";
            }


        } catch (error) {

            console.error(error);

            message.textContent =
                "Unable to connect to the server.";

            message.style.color = "#b42318";
        }

    });
}
/* =========================
   LOGIN
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document
            .getElementById("loginEmail")
            .value
            .trim();

        const password = document
            .getElementById("loginPassword")
            .value;

        const message = document.getElementById("loginMessage");

        try {
            message.textContent = "Signing you in...";
            message.style.color = "#315d3d";

            const response = await fetch(
                `${API_URL}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("token", data.token);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                message.textContent = "Login successful!";
                message.style.color = "#315d3d";

                setTimeout(function () {
                    window.location.href = "dashboard.html";
                }, 1000);

            } else {

                message.textContent =
                    data.message || "Invalid email or password.";

                message.style.color = "#b42318";
            }

        } catch (error) {

            console.error(error);

            message.textContent =
                "Unable to connect to the server.";

            message.style.color = "#b42318";
        }
    });
}