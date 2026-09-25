/* =========================================================
   BOTANICAL BLISS - GARDEN BUDDY
========================================================= */


/* =========================================================
   WAIT UNTIL PAGE IS FULLY LOADED
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const gardenBuddyButton =
        document.getElementById("gardenBuddyButton");

    const gardenBuddyChat =
        document.getElementById("gardenBuddyChat");

    const gardenBuddyClose =
        document.getElementById("gardenBuddyClose");

    const gardenBuddyMessages =
        document.getElementById("gardenBuddyMessages");

    const gardenBuddyInput =
        document.getElementById("gardenBuddyInput");

    const gardenBuddySend =
        document.getElementById("gardenBuddySend");

    const quickQuestions =
        document.querySelectorAll(".garden-quick-question");


    /* =====================================================
       CHECK ELEMENTS
    ===================================================== */

    if (
        !gardenBuddyButton ||
        !gardenBuddyChat ||
        !gardenBuddyClose ||
        !gardenBuddyMessages ||
        !gardenBuddyInput ||
        !gardenBuddySend
    ) {

        console.error(
            "Garden Buddy: Required HTML elements were not found."
        );

        return;

    }


    /* =====================================================
       OPEN CHAT
    ===================================================== */

    gardenBuddyButton.addEventListener(
        "click",
        function () {

            gardenBuddyChat.style.display = "flex";

            gardenBuddyButton.style.display = "none";

            gardenBuddyInput.focus();

        }
    );


    /* =====================================================
       CLOSE CHAT
    ===================================================== */

    gardenBuddyClose.addEventListener(
        "click",
        function () {

            gardenBuddyChat.style.display = "none";

            gardenBuddyButton.style.display = "flex";

        }
    );


    /* =====================================================
       GET CURRENT SEASON
    ===================================================== */

    function getCurrentSeason() {

        const activeSeason =
            document.querySelector(".season-button.active");

        if (activeSeason) {

            return activeSeason.dataset.season;

        }

        return "spring";

    }


    /* =====================================================
       ADD USER MESSAGE
    ===================================================== */

    function addUserMessage(message) {

        const messageElement =
            document.createElement("div");

        messageElement.className =
            "garden-buddy-message user";

        messageElement.innerHTML = `

            <div class="message-content">
                ${message}
            </div>

        `;

        gardenBuddyMessages.appendChild(
            messageElement
        );

        scrollToBottom();

    }


    /* =====================================================
       ADD BOT MESSAGE
    ===================================================== */

    function addBotMessage(message) {

        const messageElement =
            document.createElement("div");

        messageElement.className =
            "garden-buddy-message bot";

        messageElement.innerHTML = `

            <div class="message-avatar">
                <i class="bi bi-flower1"></i>
            </div>

            <div class="message-content">
                ${message}
            </div>

        `;

        gardenBuddyMessages.appendChild(
            messageElement
        );

        scrollToBottom();

    }


    /* =====================================================
       SCROLL CHAT
    ===================================================== */

    function scrollToBottom() {

        gardenBuddyMessages.scrollTop =
            gardenBuddyMessages.scrollHeight;

    }


    /* =====================================================
       BOT RESPONSE
    ===================================================== */

    function getGardenResponse(question) {

        const text =
            question.toLowerCase().trim();

        const season =
            getCurrentSeason();


        /* ---------------------------------------------
           GREETING
        --------------------------------------------- */

        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {

            return `
                Hello! 🌱<br><br>
                I'm Garden Buddy. Ask me about
                plants, watering, sunlight, pests,
                compost or your current season.
            `;

        }


        /* ---------------------------------------------
           WHAT SHOULD I GROW?
        --------------------------------------------- */

        if (
            text.includes("what should i grow") ||
            text.includes("what can i grow") ||
            text.includes("which plant") ||
            text === "grow"
        ) {

            const plants = {

                spring:
                    "Spring is great for <b>tomatoes, marigolds, basil and cucumbers</b>.",

                summer:
                    "For summer, try <b>okra, chilli, eggplant and sunflower</b>.",

                monsoon:
                    "During monsoon, <b>cucumber, beans, coriander and spinach</b> are good choices.",

                winter:
                    "Winter is suitable for <b>carrots, peas, coriander and marigolds</b>."

            };

            return `
                🌱 ${plants[season]}
                <br><br>
                Make sure the plant gets suitable
                sunlight and has well-drained soil.
            `;

        }


        /* ---------------------------------------------
           WATERING
        --------------------------------------------- */

        if (
            text.includes("water") ||
            text.includes("watering") ||
            text.includes("how often")
        ) {

            const wateringAdvice = {

                spring:
                    "Water when the top layer of soil feels dry. Avoid keeping the soil constantly soggy.",

                summer:
                    "Check the soil regularly. Water early in the morning or evening to reduce water loss.",

                monsoon:
                    "During monsoon, check the soil before watering and make sure excess water can drain away.",

                winter:
                    "Plants usually need less water in winter. Check the soil before watering."

            };

            return `
                💧 ${wateringAdvice[season]}
            `;

        }


        /* ---------------------------------------------
           YELLOW LEAVES
        --------------------------------------------- */

        if (
            text.includes("yellow") ||
            text.includes("yellow leaves")
        ) {

            return `
                🍃 Yellow leaves can have several causes.
                <br><br>
                Check the soil moisture first.
                Overwatering, poor drainage, lack of
                nutrients or insufficient sunlight can
                contribute to yellow leaves.
                <br><br>
                Start by checking the plant's soil
                and drainage.
            `;

        }


        /* ---------------------------------------------
           PESTS
        --------------------------------------------- */

        if (
            text.includes("pest") ||
            text.includes("bug") ||
            text.includes("insect")
        ) {

            return `
                🐛 Check the underside of leaves and
                new growth for insects or unusual spots.
                <br><br>
                Remove badly affected leaves and keep
                the plant area clean.
            `;

        }


        /* ---------------------------------------------
           COMPOST / FERTILIZER
        --------------------------------------------- */

        if (
            text.includes("compost") ||
            text.includes("fertilizer") ||
            text.includes("fertiliser") ||
            text.includes("nutrient")
        ) {

            return `
                🌿 Compost can improve soil structure
                and provide organic nutrients.
                <br><br>
                Add a moderate amount around the plant
                rather than applying too much fertilizer
                at once.
            `;

        }


        /* ---------------------------------------------
           SUNLIGHT
        --------------------------------------------- */

        if (
            text.includes("sunlight") ||
            text.includes("sun") ||
            text.includes("shade")
        ) {

            return `
                ☀️ Most flowering and vegetable plants
                need good sunlight, but the exact amount
                depends on the plant.
                <br><br>
                During very hot weather, sensitive plants
                may benefit from protection from harsh
                afternoon sun.
            `;

        }


        /* ---------------------------------------------
           TOMATO
        --------------------------------------------- */

        if (
            text.includes("tomato") ||
            text.includes("tomatoes")
        ) {

            return `
                🍅 Tomatoes enjoy plenty of sunlight
                and evenly moist soil.
                <br><br>
                Avoid keeping the soil waterlogged and
                give the plant enough space for airflow.
            `;

        }


        /* ---------------------------------------------
           BASIL
        --------------------------------------------- */

        if (text.includes("basil")) {

            return `
                🌿 Basil likes sunlight and regular
                watering.
                <br><br>
                Harvesting the leaves regularly can
                encourage fresh growth.
            `;

        }


        /* ---------------------------------------------
           BEGINNER
        --------------------------------------------- */

        if (
            text.includes("beginner") ||
            text.includes("easy plant") ||
            text.includes("easy plants")
        ) {

            return `
                🌱 If you're a beginner, try
                <b>basil, mint, marigold or coriander</b>.
                <br><br>
                Start with one or two plants and learn
                their watering and sunlight needs.
            `;

        }


        /* ---------------------------------------------
           BALCONY
        --------------------------------------------- */

        if (
            text.includes("balcony") ||
            text.includes("small garden") ||
            text.includes("small space")
        ) {

            return `
                🪴 For a balcony or small space, try
                <b>basil, coriander, mint, chilli or
                marigold</b>.
                <br><br>
                Use containers with drainage holes.
            `;

        }


        /* ---------------------------------------------
           SEASONS
        --------------------------------------------- */

        if (text.includes("spring")) {

            return `
                🌸 Spring is a good time to prepare
                soil, plant seasonal seeds and encourage
                new growth.
            `;

        }


        if (text.includes("summer")) {

            return `
                ☀️ During summer, focus on soil moisture,
                mulching and protecting sensitive plants
                from excessive afternoon heat.
            `;

        }


        if (
            text.includes("monsoon") ||
            text.includes("rain")
        ) {

            return `
                🌧️ During monsoon, drainage is especially
                important. Avoid unnecessary watering and
                watch for fungal growth.
            `;

        }


        if (text.includes("winter")) {

            return `
                ❄️ Winter is suitable for many vegetables
                and herbs. Give plants enough sunlight and
                protect sensitive plants from cold.
            `;

        }


        /* ---------------------------------------------
           THANK YOU
        --------------------------------------------- */

        if (
            text.includes("thank") ||
            text.includes("thanks")
        ) {

            return `
                You're welcome! 🌱<br><br>
                Happy gardening!
            `;

        }


        /* ---------------------------------------------
           DEFAULT
        --------------------------------------------- */

        return `
            🌱 I'm still learning!
            <br><br>
            Try asking me about:
            <br>
            • What should I grow?
            <br>
            • Watering
            <br>
            • Yellow leaves
            <br>
            • Sunlight
            <br>
            • Pests
            <br>
            • Compost
            <br>
            • Your current season
        `;

    }


    /* =====================================================
       SEND MESSAGE
    ===================================================== */

    function sendGardenMessage(message) {

        const cleanMessage =
            message.trim();

        if (!cleanMessage) {

            return;

        }


        addUserMessage(cleanMessage);

        gardenBuddyInput.value = "";


        setTimeout(function () {

            const response =
                getGardenResponse(cleanMessage);

            addBotMessage(response);

        }, 450);

    }


    /* =====================================================
       SEND BUTTON
    ===================================================== */

    gardenBuddySend.addEventListener(
        "click",
        function () {

            sendGardenMessage(
                gardenBuddyInput.value
            );

        }
    );


    /* =====================================================
       ENTER KEY
    ===================================================== */

    gardenBuddyInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendGardenMessage(
                    gardenBuddyInput.value
                );

            }

        }
    );


    /* =====================================================
       QUICK QUESTIONS
    ===================================================== */

    quickQuestions.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const question =
                        button.textContent.trim();

                    sendGardenMessage(question);

                }
            );

        }
    );


    console.log(
        "Garden Buddy loaded successfully."
    );

});