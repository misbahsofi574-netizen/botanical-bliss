/* =========================================
   TODAY'S GARDEN FOCUS
========================================= */

const gardenFocusData = {

    spring: {
        title: "Prepare your garden beds",
        text: "Remove weeds, loosen the soil and prepare your garden beds for new plants."
    },

    summer: {
        title: "Check soil moisture",
        text: "Check the soil before watering and make sure your plants are not drying out in the heat."
    },

    monsoon: {
        title: "Check garden drainage",
        text: "Make sure excess rainwater is draining properly and remove any standing water."
    },

    winter: {
        title: "Protect sensitive plants",
        text: "Check plants that may be affected by cold temperatures and provide suitable protection."
    }

};


/* =========================================
   SEASONAL GARDEN CHALLENGES
========================================= */

const gardenChallengeData = {

    spring: {
        title: "Spring Garden Challenge",
        text: "Give one plant in your garden some extra care today."
    },

    summer: {
        title: "Summer Garden Challenge",
        text: "Check your plants before watering and water only the ones that need it."
    },

    monsoon: {
        title: "Monsoon Garden Challenge",
        text: "Find and remove one place where rainwater is collecting."
    },

    winter: {
        title: "Winter Garden Challenge",
        text: "Spend a few minutes checking your plants for damaged or dry leaves."
    }

};


/* =========================================
   SEASONAL GUIDE
========================================= */

const seasonData = {

    spring: {

        title: "Spring",

        icon: "bi-flower1",

        description:
            "Spring is a wonderful time to refresh your garden and begin new growth.",

        plants: [

            {
                name: "Tomatoes",
                tip: "Give tomatoes plenty of sunlight and keep the soil evenly moist."
            },

            {
                name: "Marigold",
                tip: "Marigolds grow well in sunlight and need well-drained soil."
            },

            {
                name: "Basil",
                tip: "Place basil in a sunny spot and harvest the leaves regularly."
            },

            {
                name: "Cucumber",
                tip: "Cucumbers need regular watering and enough space to spread."
            }

        ],

        care: [
            "Water plants regularly",
            "Add fresh compost to the soil",
            "Give seedlings enough sunlight",
            "Remove weeds from garden beds"
        ],

        protection: [
            "Check new growth for pests",
            "Remove damaged leaves",
            "Protect young seedlings",
            "Avoid overwatering"
        ],

        checklist: [
            "Prepare garden beds",
            "Add organic compost",
            "Plant seasonal seeds",
            "Check plants for pests"
        ]

    },


    summer: {

        title: "Summer",

        icon: "bi-brightness-high",

        description:
            "Summer brings heat and strong sunlight, so focus on protecting your plants and maintaining soil moisture.",

        plants: [
            "Okra",
            "Chilli",
            "Eggplant",
            "Sunflower"
        ],

        care: [
            "Water plants early morning or evening",
            "Use mulch to retain moisture",
            "Provide shade for sensitive plants",
            "Check soil moisture regularly"
        ],

        protection: [
            "Protect plants from harsh afternoon sunlight",
            "Watch for heat stress",
            "Check regularly for pests",
            "Avoid watering during peak heat"
        ],

        checklist: [
            "Add mulch around plants",
            "Check soil moisture",
            "Provide shade where needed",
            "Inspect plants for pests"
        ]

    },


    monsoon: {

        title: "Monsoon",

        icon: "bi-cloud-rain",

        description:
            "The rainy season provides natural moisture, but good drainage and plant protection are important.",

        plants: [
            "Cucumber",
            "Beans",
            "Coriander",
            "Spinach"
        ],

        care: [
            "Check drainage after heavy rain",
            "Avoid unnecessary watering",
            "Remove standing water",
            "Add compost when needed"
        ],

        protection: [
            "Watch for fungal growth",
            "Remove infected leaves",
            "Keep garden beds well ventilated",
            "Check plants for pests"
        ],

        checklist: [
            "Check pot drainage",
            "Remove standing water",
            "Inspect leaves for fungus",
            "Remove damaged plant parts"
        ]

    },


    winter: {

        title: "Winter",

        icon: "bi-snow",

        description:
            "Cooler weather is ideal for many vegetables, herbs and flowering plants.",

        plants: [
            "Carrot",
            "Peas",
            "Coriander",
            "Marigold"
        ],

        care: [
            "Water according to soil moisture",
            "Give plants enough sunlight",
            "Add compost to garden beds",
            "Remove weeds regularly"
        ],

        protection: [
            "Protect sensitive plants from cold",
            "Remove dead leaves",
            "Watch for winter pests",
            "Avoid excessive watering"
        ],

        checklist: [
            "Plant winter vegetables",
            "Prepare garden beds",
            "Protect sensitive plants",
            "Clean garden tools"
        ]

    }

};


/* =========================================
   ELEMENTS
========================================= */

const seasonButtons =
    document.querySelectorAll(".season-button");

const seasonIcon =
    document.getElementById("seasonIcon");

const seasonTitle =
    document.getElementById("seasonTitle");

const seasonDescription =
    document.getElementById("seasonDescription");

const seasonPlants =
    document.getElementById("seasonPlants");

const seasonCare =
    document.getElementById("seasonCare");

const seasonProtection =
    document.getElementById("seasonProtection");

const seasonChecklist =
    document.getElementById("seasonChecklist");

const gardenFocusTitle =
    document.getElementById("gardenFocusTitle");

const gardenFocusText =
    document.getElementById("gardenFocusText");

const gardenFocusButton =
    document.getElementById("gardenFocusButton");

const addSeasonTask =
    document.getElementById("addSeasonTask");

const seasonTaskMessage =
    document.getElementById("seasonTaskMessage");


/* =========================================
   GARDEN CHALLENGE ELEMENTS
========================================= */

const gardenChallengeTitle =
    document.getElementById("gardenChallengeTitle");

const gardenChallengeText =
    document.getElementById("gardenChallengeText");

const gardenChallengeButton =
    document.getElementById("gardenChallengeButton");


/* =========================================
   CHECKLIST STORAGE
========================================= */

let completedTasks =
    JSON.parse(
        localStorage.getItem("seasonalChecklist")
    ) || {};


/* =========================================
   CHALLENGE STORAGE
========================================= */

let completedChallenges =
    JSON.parse(
        localStorage.getItem("seasonalChallenges")
    ) || {};


/* =========================================
   DISPLAY LIST
========================================= */

function displayList(element, items) {

    element.innerHTML = "";

    items.forEach(function(item) {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="plant-card-icon">
                <i class="bi bi-flower1"></i>
            </span>

            <span class="plant-card-name">
                ${item}
            </span>

            <i class="bi bi-arrow-up-right plant-card-arrow"></i>
        `;

        li.classList.add("plant-card");

        element.appendChild(li);

    });

}


/* =========================================
   DISPLAY PLANT CARDS
========================================= */

function displayPlantCards(element, items) {

    element.innerHTML = "";

    items.forEach(function(item) {

        const li = document.createElement("li");

        li.classList.add("plant-card");

        li.innerHTML = `
            <span class="plant-card-icon">
                <i class="bi bi-flower1"></i>
            </span>

            <span class="plant-card-name">
                ${typeof item === "string" ? item : item.name}
            </span>

            <i class="bi bi-arrow-up-right plant-card-arrow"></i>
        `;

        element.appendChild(li);

    });

}


/* =========================================
   DISPLAY CHECKLIST
========================================= */

function displayChecklist(season) {

    seasonChecklist.innerHTML = "";

    const tasks =
        seasonData[season].checklist;

    tasks.forEach(function(task, index) {

        const taskId =
            season + "-" + index;

        const isCompleted =
            completedTasks[taskId] || false;

        const taskItem =
            document.createElement("label");

        taskItem.className =
            "season-check-item";

        if (isCompleted) {

            taskItem.classList.add("completed");

        }

        taskItem.innerHTML = `
            <input
                type="checkbox"
                data-task-id="${taskId}"
                ${isCompleted ? "checked" : ""}
            >

            <span>
                ${task}
            </span>
        `;

        seasonChecklist.appendChild(taskItem);

    });

}


/* =========================================
   SEASON CHECKLIST PROGRESS
========================================= */

function updateSeasonProgress(season) {

    const tasks =
        seasonData[season].checklist;

    const totalTasks =
        tasks.length;

    let completedCount = 0;

    tasks.forEach(function(task, index) {

        const taskId =
            season + "-" + index;

        if (completedTasks[taskId]) {

            completedCount++;

        }

    });

    const percentage =
        totalTasks > 0
            ? (completedCount / totalTasks) * 100
            : 0;

    const progressText =
        document.getElementById("seasonProgressText");

    const progressFill =
        document.getElementById("seasonProgressFill");

    const progressMessage =
        document.getElementById("seasonProgressMessage");

    progressText.textContent =
        completedCount + " / " + totalTasks + " completed";

    progressFill.style.width =
        percentage + "%";

    if (completedCount === 0) {

        progressMessage.textContent =
            "Start checking off your seasonal tasks.";

    } else if (completedCount < totalTasks) {

        progressMessage.textContent =
            "You're making progress. Keep going!";

    } else {

        progressMessage.textContent =
            "All seasonal tasks completed. Great job!";

    }

}


/* =========================================
   DISPLAY GARDEN CHALLENGE
========================================= */

function displayGardenChallenge(season) {

    const challenge =
        gardenChallengeData[season];

    if (!challenge) {

        return;

    }

    gardenChallengeTitle.textContent =
        challenge.title;

    gardenChallengeText.textContent =
        challenge.text;

    const completed =
        completedChallenges[season] || false;

    if (completed) {

        gardenChallengeButton.innerHTML =
            '<i class="bi bi-check2-circle"></i> Challenge Completed';

        gardenChallengeButton.disabled = true;

    } else {

        gardenChallengeButton.innerHTML =
            '<i class="bi bi-trophy"></i> I Did It!';

        gardenChallengeButton.disabled = false;

    }

}


/* =========================================
   DISPLAY SEASON
========================================= */

function displaySeason(season) {

    const data =
        seasonData[season];

    if (!data) {

        return;

    }


    /* Icon */

    seasonIcon.className =
        "bi " + data.icon;


    /* Title */

    seasonTitle.textContent =
        data.title;


    /* Description */

    seasonDescription.textContent =
        data.description;


    /* Today's Garden Focus */

    const focus =
        gardenFocusData[season];

    if (focus) {

        gardenFocusTitle.textContent =
            focus.title;

        gardenFocusText.textContent =
            focus.text;

        gardenFocusButton.innerHTML =
            '<i class="bi bi-check2"></i> Mark as Done';

        gardenFocusButton.disabled = false;

    }


    /* Information */

    displayPlantCards(
        seasonPlants,
        data.plants
    );

    displayList(
        seasonCare,
        data.care
    );

    displayList(
        seasonProtection,
        data.protection
    );


    /* Checklist */

    displayChecklist(season);


    /* Progress */

    updateSeasonProgress(season);


    /* Garden Challenge */

    displayGardenChallenge(season);

}


/* =========================================
   SEASON BUTTONS
========================================= */

seasonButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            seasonButtons.forEach(
                function(seasonButton) {

                    seasonButton.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add("active");


            const selectedSeason =
                button.dataset.season;


            displaySeason(selectedSeason);

        }
    );

});


/* =========================================
   CHECKLIST INTERACTION
========================================= */

seasonChecklist.addEventListener(
    "change",
    function(event) {

        if (
            !event.target.matches(
                'input[type="checkbox"]'
            )
        ) {

            return;

        }


        const taskId =
            event.target.dataset.taskId;


        completedTasks[taskId] =
            event.target.checked;


        localStorage.setItem(
            "seasonalChecklist",
            JSON.stringify(completedTasks)
        );


        const taskItem =
            event.target.closest(
                ".season-check-item"
            );


        if (taskItem) {

            taskItem.classList.toggle(
                "completed",
                event.target.checked
            );

        }


        const activeSeason =
            document.querySelector(
                ".season-button.active"
            );

        if (activeSeason) {

            updateSeasonProgress(
                activeSeason.dataset.season
            );

        }

    }
);


/* =========================================
   TODAY'S GARDEN FOCUS
========================================= */

gardenFocusButton.addEventListener(
    "click",
    function() {

        gardenFocusButton.innerHTML =
            '<i class="bi bi-check2-circle"></i> Completed';

        gardenFocusButton.disabled = true;

    }
);


/* =========================================
   GARDEN CHALLENGE
========================================= */

gardenChallengeButton.addEventListener(
    "click",
    function() {

        const activeSeason =
            document.querySelector(
                ".season-button.active"
            );

        if (!activeSeason) {

            return;

        }

        const season =
            activeSeason.dataset.season;


        completedChallenges[season] = true;


        localStorage.setItem(
            "seasonalChallenges",
            JSON.stringify(completedChallenges)
        );


        gardenChallengeButton.innerHTML =
            '<i class="bi bi-check2-circle"></i> Challenge Completed';

        gardenChallengeButton.disabled = true;

    }
);


/* =========================================
   DEFAULT SEASON
========================================= */

displaySeason("spring");


/* =========================================
   ADD SEASONAL TASK TO GARDEN CALENDAR
========================================= */

addSeasonTask.addEventListener("click", function() {

    const currentUser =
        JSON.parse(localStorage.getItem("user"));

    const token =
        localStorage.getItem("token");


    /* User must be logged in */

    if (!currentUser || !token) {

        alert("Please login to add seasonal tasks.");

        window.location.href =
            "login.html";

        return;

    }


    const activeSeason =
        document.querySelector(
            ".season-button.active"
        );


    if (!activeSeason) {

        return;

    }


    const season =
        activeSeason.dataset.season;


    const tasks =
        seasonData[season].checklist;


    /* User-specific task storage */

    const userTaskKey =
        `gardenPersonalTasks_${
            currentUser._id ||
            currentUser.id ||
            currentUser.email
        }`;


    let personalTasks =
        JSON.parse(
            localStorage.getItem(userTaskKey)
        ) || [];


    /* Convert old string tasks into objects */

    personalTasks =
        personalTasks.map(function(task) {

            if (typeof task === "string") {

                return {

                    task: task,
                    date: "",
                    time: ""

                };

            }

            return task;

        });


    /* Add seasonal tasks */

    tasks.forEach(function(task) {

        const alreadyExists =
            personalTasks.some(function(item) {

                return item.task === task;

            });


        if (!alreadyExists) {

            personalTasks.push({

                task: task,
                date: "",
                time: ""

            });

        }

    });


    localStorage.setItem(
        userTaskKey,
        JSON.stringify(personalTasks)
    );


    seasonTaskMessage.textContent =
        "Seasonal tasks have been added to My Gardening Tasks.";

});