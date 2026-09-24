
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
            "Tomatoes",
            "Coriander",
            "Marigold",
            "Basil"
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

    
const addSeasonTask =
    document.getElementById("addSeasonTask");

const seasonTaskMessage =
    document.getElementById("seasonTaskMessage");




/* =========================================
   CHECKLIST STORAGE
========================================= */

let completedTasks =
    JSON.parse(
        localStorage.getItem("seasonalChecklist")
    ) || {};


/* =========================================
   DISPLAY LIST
========================================= */

function displayList(element, items) {

    element.innerHTML = "";

    items.forEach(function(item) {

        const listItem =
            document.createElement("li");

        listItem.textContent = item;

        element.appendChild(listItem);

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


    /* Information */

    displayList(
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

    const activeSeason =
        document.querySelector(".season-button.active");

    if (!activeSeason) {
        return;
    }

    const season =
        activeSeason.dataset.season;

    const tasks =
        seasonData[season].checklist;

    let personalTasks =
        JSON.parse(
            localStorage.getItem("gardenPersonalTasks")
        ) || [];


    tasks.forEach(function(task) {

        if (!personalTasks.includes(task)) {

            personalTasks.push(task);

        }

    });


    localStorage.setItem(
        "gardenPersonalTasks",
        JSON.stringify(personalTasks)
    );


    seasonTaskMessage.textContent =
        "Seasonal tasks have been added to My Gardening Tasks.";

});
