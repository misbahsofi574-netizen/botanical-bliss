console.log("GARDEN CALENDAR JS LOADED");


/* =========================================
   WEEKLY GARDENING DATA
========================================= */

const monthData = {

    January: {
        description:
            "Start the year by planning your garden, preparing your soil and getting ready for the new growing season.",

        weeks: [

            {
                title: "Week 1",
                focus: "Garden Planning",
                tasks: [
                    "Plan your garden layout",
                    "Decide which plants you want to grow",
                    "Check your existing gardening supplies",
                    "Make a list of seeds and tools you need"
                ]
            },

            {
                title: "Week 2",
                focus: "Soil Preparation",
                tasks: [
                    "Prepare and loosen the soil",
                    "Add organic compost",
                    "Remove weeds and dead plant material",
                    "Check that pots have proper drainage"
                ]
            },

            {
                title: "Week 3",
                focus: "Seed Preparation",
                tasks: [
                    "Start seeds suitable for the season",
                    "Label newly planted seeds",
                    "Keep seed trays in suitable light",
                    "Check soil moisture regularly"
                ]
            },

            {
                title: "Week 4",
                focus: "Garden Maintenance",
                tasks: [
                    "Inspect plants for pests",
                    "Remove damaged leaves",
                    "Clean gardening tools",
                    "Review your garden plan for February"
                ]
            }

        ]
    },


    February: {
        description:
            "Prepare your garden for active growth by planting suitable vegetables, herbs and flowering plants.",

        weeks: [

            {
                title: "Week 1",
                focus: "Planting",
                tasks: [
                    "Plant suitable seasonal vegetables",
                    "Plant herbs in containers or garden beds",
                    "Check seedling growth",
                    "Give new plants gentle watering"
                ]
            },

            {
                title: "Week 2",
                focus: "Soil Care",
                tasks: [
                    "Add organic compost to garden beds",
                    "Loosen compacted soil",
                    "Remove weeds around plants",
                    "Check soil drainage"
                ]
            },

            {
                title: "Week 3",
                focus: "Plant Health",
                tasks: [
                    "Check plants for pests",
                    "Remove yellow or damaged leaves",
                    "Inspect new growth",
                    "Water plants according to their needs"
                ]
            },

            {
                title: "Week 4",
                focus: "Garden Maintenance",
                tasks: [
                    "Clean plant containers",
                    "Trim damaged growth",
                    "Check support for climbing plants",
                    "Prepare plants for warmer weather"
                ]
            }

        ]
    },


    March: {
        description:
            "Give your garden extra attention as temperatures begin to rise and plants enter an active growing period.",

        weeks: [

            {
                title: "Week 1",
                focus: "Flowering Plants",
                tasks: [
                    "Plant suitable flowering plants",
                    "Remove faded flowers",
                    "Check plants for healthy new growth",
                    "Give plants suitable sunlight"
                ]
            },

            {
                title: "Week 2",
                focus: "Herbs & Vegetables",
                tasks: [
                    "Grow suitable herbs",
                    "Plant seasonal vegetables",
                    "Thin overcrowded seedlings",
                    "Add compost around established plants"
                ]
            },

            {
                title: "Week 3",
                focus: "Watering",
                tasks: [
                    "Check soil moisture regularly",
                    "Increase watering when needed",
                    "Water plants during cooler parts of the day",
                    "Avoid leaving soil constantly wet"
                ]
            },

            {
                title: "Week 4",
                focus: "Plant Health",
                tasks: [
                    "Remove damaged leaves",
                    "Inspect plants for pests",
                    "Clean plant leaves",
                    "Check plants for signs of stress"
                ]
            }

        ]
    },


    April: {
        description:
            "Protect your plants from increasing heat and maintain proper watering and soil moisture.",

        weeks: [

            {
                title: "Week 1",
                focus: "Watering",
                tasks: [
                    "Water plants in the morning or evening",
                    "Check soil moisture before watering",
                    "Give newly planted plants extra attention",
                    "Avoid unnecessary overwatering"
                ]
            },

            {
                title: "Week 2",
                focus: "Mulching",
                tasks: [
                    "Add mulch around garden plants",
                    "Keep mulch away from plant stems",
                    "Check soil moisture under mulch",
                    "Remove unwanted weeds"
                ]
            },

            {
                title: "Week 3",
                focus: "Sun Protection",
                tasks: [
                    "Protect delicate plants from strong sunlight",
                    "Move sensitive potted plants if necessary",
                    "Check leaves for sun damage",
                    "Provide suitable shade when required"
                ]
            },

            {
                title: "Week 4",
                focus: "Pest Check",
                tasks: [
                    "Inspect leaves for pests",
                    "Check the underside of leaves",
                    "Remove damaged plant parts",
                    "Keep the garden clean"
                ]
            }

        ]
    },


    May: {
        description:
            "Hot weather requires careful watering, moisture management and protection for sensitive plants.",

        weeks: [

            {
                title: "Week 1",
                focus: "Water Management",
                tasks: [
                    "Water plants regularly",
                    "Check soil moisture before watering",
                    "Water deeply when appropriate",
                    "Avoid watering during peak afternoon heat"
                ]
            },

            {
                title: "Week 2",
                focus: "Moisture Protection",
                tasks: [
                    "Use mulch to retain soil moisture",
                    "Remove weeds competing for water",
                    "Check pots for drying soil",
                    "Inspect plants for heat stress"
                ]
            },

            {
                title: "Week 3",
                focus: "Plant Protection",
                tasks: [
                    "Provide shade for sensitive plants",
                    "Move delicate containers if necessary",
                    "Check leaves for heat damage",
                    "Keep plants away from excessive reflected heat"
                ]
            },

            {
                title: "Week 4",
                focus: "Garden Health",
                tasks: [
                    "Check plants for pests",
                    "Remove dead or damaged leaves",
                    "Avoid overwatering",
                    "Prepare the garden for the monsoon season"
                ]
            }

        ]
    },


    June: {
        description:
            "The monsoon season brings an opportunity for planting, but drainage and moisture management become important.",

        weeks: [

            {
                title: "Week 1",
                focus: "Monsoon Preparation",
                tasks: [
                    "Improve soil drainage",
                    "Clear blocked drainage areas",
                    "Remove standing water",
                    "Check pots after heavy rain"
                ]
            },

            {
                title: "Week 2",
                focus: "Monsoon Planting",
                tasks: [
                    "Plant suitable monsoon crops",
                    "Plant suitable herbs",
                    "Give new plants enough space",
                    "Add compost where needed"
                ]
            },

            {
                title: "Week 3",
                focus: "Rainwater Management",
                tasks: [
                    "Check plants after heavy rain",
                    "Remove excess water from containers",
                    "Check roots for waterlogging",
                    "Keep garden pathways clear"
                ]
            },

            {
                title: "Week 4",
                focus: "Fungal Protection",
                tasks: [
                    "Check plants for fungal growth",
                    "Remove affected leaves",
                    "Improve air circulation around plants",
                    "Avoid unnecessary watering during rainy days"
                ]
            }

        ]
    },


    July: {
        description:
            "Keep your garden healthy during the rainy season by managing moisture, drainage and plant diseases.",

        weeks: [

            {
                title: "Week 1",
                focus: "Rain Check",
                tasks: [
                    "Monitor plants after heavy rain",
                    "Remove excess water",
                    "Check containers for blocked drainage",
                    "Inspect soil for waterlogging"
                ]
            },

            {
                title: "Week 2",
                focus: "Soil & Compost",
                tasks: [
                    "Add compost when needed",
                    "Remove weeds",
                    "Loosen compacted soil carefully",
                    "Check garden beds for erosion"
                ]
            },

            {
                title: "Week 3",
                focus: "Disease Prevention",
                tasks: [
                    "Check leaves for diseases",
                    "Remove damaged leaves",
                    "Improve air circulation",
                    "Avoid keeping foliage unnecessarily wet"
                ]
            },

            {
                title: "Week 4",
                focus: "Pest Management",
                tasks: [
                    "Inspect plants for pests",
                    "Check the underside of leaves",
                    "Remove badly affected plant parts",
                    "Keep the garden clean"
                ]
            }

        ]
    },


    August: {
        description:
            "Continue caring for plants during the rainy season while maintaining drainage, cleanliness and healthy growth.",

        weeks: [

            {
                title: "Week 1",
                focus: "Pruning",
                tasks: [
                    "Prune damaged branches",
                    "Remove dead leaves",
                    "Remove unhealthy plant growth",
                    "Keep plants well ventilated"
                ]
            },

            {
                title: "Week 2",
                focus: "Weed Control",
                tasks: [
                    "Remove weeds from garden beds",
                    "Clear weeds around containers",
                    "Check for fast-growing unwanted plants",
                    "Add mulch where suitable"
                ]
            },

            {
                title: "Week 3",
                focus: "Drainage",
                tasks: [
                    "Check soil drainage",
                    "Clear blocked drainage holes",
                    "Remove standing water",
                    "Inspect pots after rainfall"
                ]
            },

            {
                title: "Week 4",
                focus: "Pest Inspection",
                tasks: [
                    "Inspect plants for pests",
                    "Check leaves and stems",
                    "Remove damaged plant parts",
                    "Monitor new plant growth"
                ]
            }

        ]
    },


    September: {
        description:
            "Prepare your garden for the transition from monsoon to the next growing season.",

        weeks: [

            {
                title: "Week 1",
                focus: "Garden Cleaning",
                tasks: [
                    "Clean garden beds",
                    "Remove dead plant material",
                    "Remove weeds",
                    "Clean gardening tools"
                ]
            },

            {
                title: "Week 2",
                focus: "Soil Improvement",
                tasks: [
                    "Add organic compost",
                    "Improve soil structure",
                    "Check drainage",
                    "Prepare beds for seasonal planting"
                ]
            },

            {
                title: "Week 3",
                focus: "Seasonal Planting",
                tasks: [
                    "Plant suitable seasonal flowers",
                    "Start suitable vegetable seeds",
                    "Check seedling health",
                    "Give newly planted plants proper care"
                ]
            },

            {
                title: "Week 4",
                focus: "Plant Maintenance",
                tasks: [
                    "Remove unhealthy plant parts",
                    "Inspect plants for pests",
                    "Trim damaged growth",
                    "Review your garden before October"
                ]
            }

        ]
    },


    October: {
        description:
            "Prepare the garden for cooler weather and seasonal flowering and vegetable plants.",

        weeks: [

            {
                title: "Week 1",
                focus: "Winter Preparation",
                tasks: [
                    "Prepare vegetable beds",
                    "Add compost to the soil",
                    "Remove weeds",
                    "Plan winter-season plants"
                ]
            },

            {
                title: "Week 2",
                focus: "Flower Planting",
                tasks: [
                    "Plant suitable winter flowers",
                    "Prepare flower containers",
                    "Give new plants suitable sunlight",
                    "Remove faded flowers"
                ]
            },

            {
                title: "Week 3",
                focus: "Vegetable Garden",
                tasks: [
                    "Plant suitable winter vegetables",
                    "Check seedlings",
                    "Provide support for growing plants",
                    "Keep garden beds clean"
                ]
            },

            {
                title: "Week 4",
                focus: "Pruning & Care",
                tasks: [
                    "Prune overgrown plants",
                    "Remove damaged branches",
                    "Check plants for pests",
                    "Add compost where required"
                ]
            }

        ]
    },


    November: {
        description:
            "Enjoy the cooler weather and focus on growing vegetables, herbs and seasonal flowers.",

        weeks: [

            {
                title: "Week 1",
                focus: "Winter Vegetables",
                tasks: [
                    "Plant suitable winter vegetables",
                    "Check vegetable seedlings",
                    "Remove competing weeds",
                    "Add compost when required"
                ]
            },

            {
                title: "Week 2",
                focus: "Herb Garden",
                tasks: [
                    "Grow suitable herbs",
                    "Harvest mature herbs",
                    "Trim overgrown stems",
                    "Check herbs for pests"
                ]
            },

            {
                title: "Week 3",
                focus: "Watering",
                tasks: [
                    "Water plants according to their needs",
                    "Check soil before watering",
                    "Avoid unnecessary overwatering",
                    "Pay attention to container plants"
                ]
            },

            {
                title: "Week 4",
                focus: "Garden Maintenance",
                tasks: [
                    "Remove weeds regularly",
                    "Remove dead leaves",
                    "Inspect plants for pests",
                    "Clean garden tools"
                ]
            }

        ]
    },


    December: {
        description:
            "End the year by maintaining your garden, protecting sensitive plants and planning for the next season.",

        weeks: [

            {
                title: "Week 1",
                focus: "Garden Cleaning",
                tasks: [
                    "Remove dead leaves",
                    "Clean garden beds",
                    "Remove unhealthy plant material",
                    "Clean gardening tools"
                ]
            },

            {
                title: "Week 2",
                focus: "Cold Protection",
                tasks: [
                    "Protect sensitive plants from cold",
                    "Move delicate containers if necessary",
                    "Check plants for cold stress",
                    "Avoid unnecessary watering"
                ]
            },

            {
                title: "Week 3",
                focus: "Plant Maintenance",
                tasks: [
                    "Check winter plants",
                    "Remove damaged leaves",
                    "Inspect plants for pests",
                    "Maintain suitable soil moisture"
                ]
            },

            {
                title: "Week 4",
                focus: "Plan Next Year",
                tasks: [
                    "Review your gardening activities",
                    "Make a list of successful plants",
                    "Plan next year's garden",
                    "Prepare a list of seeds and supplies"
                ]
            }

        ]
    }

};


/* =========================================
   MONTH ELEMENTS
========================================= */

const monthButtons =
    document.querySelectorAll(".month-button");

const calendarMonth =
    document.getElementById("calendarMonth");

const calendarDescription =
    document.getElementById("calendarDescription");

const gardenTasks =
    document.getElementById("gardenTasks");


/* =========================================
   COMPLETED WEEKLY TASKS
========================================= */

let completedTasks =
    JSON.parse(
        localStorage.getItem(
            "completedGardenTasks"
        )
    ) || {};


/* =========================================
   DISPLAY MONTH / WEEKLY ACCORDION
========================================= */

function displayMonth(month) {

    const data = monthData[month];

    if (!data) {
        return;
    }


    calendarMonth.textContent =
        month;

    calendarDescription.textContent =
        data.description;

    gardenTasks.innerHTML = "";


    /* =====================================
       COUNT ALL TASKS
    ====================================== */

    let totalTasks = 0;

    data.weeks.forEach(week => {

        totalTasks +=
            week.tasks.length;

    });


    const completedMonthTasks =
        completedTasks[month] || [];


    const completed =
        completedMonthTasks.length;


    const percentage =
        totalTasks === 0
            ? 0
            : Math.round(
                (completed / totalTasks) * 100
            );


    /* =====================================
       PROGRESS
    ====================================== */

    const progressBox =
        document.createElement("div");

    progressBox.className =
        "garden-progress";

    progressBox.innerHTML = `

        <div class="progress-info">

            <span>
                Gardening Progress
            </span>

            <strong>
                ${completed} of ${totalTasks} completed
            </strong>

        </div>

        <div class="progress-bar">

            <div
                class="progress-fill"
                style="width: ${percentage}%"
            ></div>

        </div>

    `;

    gardenTasks.appendChild(
        progressBox
    );


    /* =====================================
       WEEKLY ACCORDION
    ====================================== */

    let globalTaskIndex = 0;


    data.weeks.forEach(
        (week, weekIndex) => {

            const weekBox =
                document.createElement("div");

            weekBox.className =
                "weekly-garden-week";


            /* ---------------------------------
               OPEN FIRST WEEK BY DEFAULT
            --------------------------------- */

            if (weekIndex === 0) {

                weekBox.classList.add(
                    "open"
                );

            }


            /* ---------------------------------
               WEEK HEADER
            --------------------------------- */

            const weekHeader =
                document.createElement("button");

            weekHeader.type =
                "button";

            weekHeader.className =
                "weekly-garden-week-header";

            weekHeader.innerHTML = `

                <div class="weekly-garden-week-icon">

                    <i class="bi bi-calendar-week"></i>

                </div>


                <div class="weekly-garden-week-info">

                    <h3 class="weekly-garden-week-title">
                        ${week.title}
                    </h3>

                    <p class="weekly-garden-week-subtitle">
                        ${week.focus}
                    </p>

                </div>


                <div class="weekly-garden-week-arrow">

                    <i class="bi bi-chevron-down"></i>

                </div>

            `;


            /* ---------------------------------
               WEEK CONTENT
            --------------------------------- */

            const weekContent =
                document.createElement("div");

            weekContent.className =
                "weekly-garden-week-content";


            week.tasks.forEach(
                task => {

                    const taskIndex =
                        globalTaskIndex;


                    const isCompleted =
                        completedMonthTasks.includes(
                            taskIndex
                        );


                    const taskItem =
                        document.createElement("div");


                    taskItem.className =
                        "garden-task";


                    if (isCompleted) {

                        taskItem.classList.add(
                            "completed"
                        );

                    }


                    taskItem.innerHTML = `

                        <button
                            class="garden-task-check"
                            type="button"
                            aria-label="Mark task complete"
                        >

                            <i class="bi ${
                                isCompleted
                                    ? "bi-check-circle-fill"
                                    : "bi-circle"
                            }"></i>

                        </button>


                        <span>
                            ${task}
                        </span>

                    `;


                    const checkButton =
                        taskItem.querySelector(
                            ".garden-task-check"
                        );


                    checkButton.addEventListener(
                        "click",
                        event => {

                            event.stopPropagation();

                            toggleTask(
                                month,
                                taskIndex
                            );

                        }
                    );


                    weekContent.appendChild(
                        taskItem
                    );


                    globalTaskIndex++;

                }
            );


            weekBox.appendChild(
                weekHeader
            );

            weekBox.appendChild(
                weekContent
            );


            /* ---------------------------------
               ACCORDION CLICK
            --------------------------------- */

            weekHeader.addEventListener(
                "click",
                () => {

                    weekBox.classList.toggle(
                        "open"
                    );

                }
            );


            gardenTasks.appendChild(
                weekBox
            );

        }
    );

}


/* =========================================
   TOGGLE WEEKLY TASK
========================================= */

function toggleTask(
    month,
    index
) {

    if (!completedTasks[month]) {

        completedTasks[month] = [];

    }


    const position =
        completedTasks[month].indexOf(
            index
        );


    if (position === -1) {

        completedTasks[month].push(
            index
        );

    } else {

        completedTasks[month].splice(
            position,
            1
        );

    }


    localStorage.setItem(
        "completedGardenTasks",
        JSON.stringify(
            completedTasks
        )
    );


    displayMonth(month);

}


/* =========================================
   MONTH BUTTONS
========================================= */

monthButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {


                monthButtons.forEach(
                    monthButton => {

                        monthButton.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                displayMonth(
                    button.dataset.month
                );

            }
        );

    }
);


/* =========================================
   PERSONAL GARDENING TASKS
========================================= */

const personalTaskInput =
    document.getElementById(
        "personalTaskInput"
    );

const personalTaskDate =
    document.getElementById(
        "personalTaskDate"
    );

const personalTaskTime =
    document.getElementById(
        "personalTaskTime"
    );

const addPersonalTask =
    document.getElementById(
        "addPersonalTask"
    );

const personalTasks =
    document.getElementById(
        "personalTasks"
    );


/* =========================================
   USER-SPECIFIC PERSONAL TASKS
========================================= */

const currentUser =
    JSON.parse(
        localStorage.getItem("user")
    );


const userTaskKey =
    currentUser
        ? `gardenPersonalTasks_${
            currentUser._id ||
            currentUser.id ||
            currentUser.email
        }`
        : "gardenPersonalTasks";


let savedTasks =
    JSON.parse(
        localStorage.getItem(
            userTaskKey
        )
    ) || [];


/* =========================================
   CONVERT OLD TASK FORMAT
========================================= */

savedTasks =
    savedTasks.map(
        task => {

            if (
                typeof task === "string"
            ) {

                return {
                    task: task,
                    date: "",
                    time: ""
                };

            }

            return task;

        }
    );


/* =========================================
   DISPLAY PERSONAL TASKS
========================================= */

function displayPersonalTasks() {

    personalTasks.innerHTML = "";


    savedTasks.forEach(
        (task, index) => {

            const taskItem =
                document.createElement(
                    "div"
                );


            taskItem.className =
                "personal-task";


            let scheduleText = "";


            if (
                task.date &&
                task.time
            ) {

                scheduleText = `

                    <small>

                        <i class="bi bi-calendar-event"></i>

                        ${task.date}
                        at
                        ${task.time}

                    </small>

                `;

            } else {

                scheduleText = `

                    <small>
                        No reminder scheduled
                    </small>

                `;

            }


            taskItem.innerHTML = `

                <div class="personal-task-content">

                    <i class="bi bi-check-circle"></i>

                    <div>

                        <span>
                            ${task.task}
                        </span>

                        ${scheduleText}

                    </div>

                </div>


                <button
                    class="delete-personal-task"
                    data-index="${index}"
                    title="Delete task"
                    type="button"
                >

                    <i class="bi bi-trash"></i>

                </button>

            `;


            personalTasks.appendChild(
                taskItem
            );

        }
    );

}


/* =========================================
   ADD PERSONAL TASK
========================================= */

addPersonalTask.addEventListener(
    "click",
    async () => {

        const task =
            personalTaskInput.value.trim();

        const date =
            personalTaskDate.value;

        const time =
            personalTaskTime.value;


        if (task === "") {

            alert(
                "Please enter a task."
            );

            return;

        }


        if (date === "") {

            alert(
                "Please select a date."
            );

            return;

        }


        if (time === "") {

            alert(
                "Please select a time."
            );

            return;

        }


        /* =================================
           LOGIN CHECK
        ================================== */

        const token =
            localStorage.getItem(
                "token"
            );


        if (!token) {

            alert(
                "Please login before scheduling a reminder."
            );

            window.location.href =
                "login.html";

            return;

        }


        /* =================================
           SAVE REMINDER TO BACKEND
        ================================== */

        try {

            const response =
                await fetch(
                    "https://botanical-bliss-52ra.onrender.com/api/garden-reminders",
                    {
                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify({

                                task: task,
                                date: date,
                                time: time

                            })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                alert(
                    data.message ||
                    "Failed to schedule gardening reminder."
                );

                return;

            }


            /* =============================
               SAVE LOCALLY
            ============================== */

            const newTask = {

                task: task,
                date: date,
                time: time

            };


            savedTasks.push(
                newTask
            );


            localStorage.setItem(
                userTaskKey,
                JSON.stringify(
                    savedTasks
                )
            );


            /* =============================
               CLEAR INPUTS
            ============================== */

            personalTaskInput.value =
                "";

            personalTaskDate.value =
                "";

            personalTaskTime.value =
                "";


            displayPersonalTasks();


            alert(
                "Gardening task scheduled successfully!\n" +
                "You will receive an email reminder at the scheduled time."
            );


        } catch (error) {

            console.error(
                "Reminder scheduling error:",
                error
            );


            alert(
                "Unable to connect to the server. " +
                "Please make sure Botanical Bliss server is running."
            );

        }

    }
);


/* =========================================
   ENTER KEY
========================================= */

personalTaskInput.addEventListener(
    "keypress",
    event => {

        if (
            event.key === "Enter"
        ) {

            addPersonalTask.click();

        }

    }
);


/* =========================================
   DELETE PERSONAL TASK
========================================= */

personalTasks.addEventListener(
    "click",
    event => {

        const deleteButton =
            event.target.closest(
                ".delete-personal-task"
            );


        if (!deleteButton) {
            return;
        }


        const index =
            Number(
                deleteButton.dataset.index
            );


        savedTasks.splice(
            index,
            1
        );


        localStorage.setItem(
            userTaskKey,
            JSON.stringify(
                savedTasks
            )
        );


        displayPersonalTasks();

    }
);


/* =========================================
   MY GARDEN
========================================= */

const plantNameInput =
    document.getElementById(
        "plantNameInput"
    );

const plantTypeInput =
    document.getElementById(
        "plantTypeInput"
    );

const addPlantButton =
    document.getElementById(
        "addPlantButton"
    );

const myGardenPlants =
    document.getElementById(
        "myGardenPlants"
    );

const plantCount =
    document.getElementById(
        "plantCount"
    );


/* =========================================
   USER-SPECIFIC GARDEN
========================================= */

const gardenUserKey =
    currentUser
        ? `myGardenPlants_${
            currentUser._id ||
            currentUser.id ||
            currentUser.email
        }`
        : "myGardenPlants";


let myGarden =
    JSON.parse(
        localStorage.getItem(
            gardenUserKey
        )
    ) || [];


/* =========================================
   REMOVE DUPLICATE PLANTS
========================================= */

myGarden =
    myGarden.filter(
        (plant, index, self) =>

            index ===
            self.findIndex(
                p =>
                    p.name.toLowerCase() ===
                    plant.name.toLowerCase()
            )
    );


localStorage.setItem(
    gardenUserKey,
    JSON.stringify(
        myGarden
    )
);


/* =========================================
   PERSONALIZED CARE DATA
========================================= */

const plantCareData = {

    "Peace Lily": [
        "Check if the top layer of soil feels dry.",
        "Keep the plant in bright, indirect sunlight.",
        "Remove yellow or damaged leaves.",
        "Wipe the leaves to keep them clean."
    ],

    "Rose": [
        "Check the plant for pests.",
        "Remove faded flowers.",
        "Make sure the plant gets enough sunlight.",
        "Water when the soil begins to dry."
    ],

    "Snake Plant": [
        "Check the soil before watering.",
        "Keep the plant in bright or moderate indirect light.",
        "Remove damaged leaves.",
        "Avoid overwatering."
    ],

    "Mint": [
        "Check soil moisture regularly.",
        "Give the plant enough sunlight.",
        "Trim overgrown stems.",
        "Check for pests."
    ],

    "Basil": [
        "Check the soil moisture.",
        "Pinch off flowering tips.",
        "Harvest the leaves regularly.",
        "Give the plant enough sunlight."
    ],

    "Lavender": [
        "Make sure the soil is well drained.",
        "Give the plant plenty of sunlight.",
        "Remove dry or faded flowers.",
        "Avoid keeping the soil constantly wet."
    ],

    default: [
        "Check the soil moisture.",
        "Check the plant for pests or damaged leaves.",
        "Make sure the plant is getting suitable sunlight.",
        "Remove dry or unhealthy leaves."
    ]

};


/* =========================================
   DISPLAY MY GARDEN
========================================= */

function displayMyGarden() {

    myGardenPlants.innerHTML = "";


    plantCount.textContent =
        `${myGarden.length} ${
            myGarden.length === 1
                ? "Plant"
                : "Plants"
        }`;


    if (
        myGarden.length === 0
    ) {

        myGardenPlants.innerHTML = `

            <div class="empty-garden">

                <i class="bi bi-flower1"></i>

                <p>
                    Your garden is empty.
                </p>

                <span>
                    Add your first plant above.
                </span>

            </div>

        `;


        displayPlantCare();

        return;

    }


    myGarden.forEach(
        (plant, index) => {

            const plantCard =
                document.createElement(
                    "div"
                );


            plantCard.className =
                "garden-plant-card";


            plantCard.innerHTML = `

                <div class="plant-icon">
                    <i class="bi bi-flower1"></i>
                </div>


                <div class="plant-info">

                    <h4>
                        ${plant.name}
                    </h4>

                    <span>
                        ${plant.type}
                    </span>

                </div>


                <button
                    class="remove-plant"
                    data-index="${index}"
                    title="Remove plant"
                    type="button"
                >

                    <i class="bi bi-trash3"></i>

                </button>

            `;


            myGardenPlants.appendChild(
                plantCard
            );

        }
    );


    displayPlantCare();

}


/* =========================================
   ADD PLANT
========================================= */

function addPlant() {

    const name =
        plantNameInput.value.trim();

    const type =
        plantTypeInput.value;


    if (name === "") {

        alert(
            "Please enter a plant name."
        );

        return;

    }


    if (type === "") {

        alert(
            "Please select a plant type."
        );

        return;

    }


    const alreadyExists =
        myGarden.some(
            plant =>
                plant.name.toLowerCase() ===
                name.toLowerCase()
        );


    if (alreadyExists) {

        alert(
            "This plant is already in your garden."
        );

        return;

    }


    myGarden.push({

        name: name,
        type: type

    });


    localStorage.setItem(
        gardenUserKey,
        JSON.stringify(
            myGarden
        )
    );


    plantNameInput.value =
        "";

    plantTypeInput.value =
        "";


    displayMyGarden();

}


addPlantButton.addEventListener(
    "click",
    addPlant
);


plantNameInput.addEventListener(
    "keypress",
    event => {

        if (
            event.key === "Enter"
        ) {

            addPlant();

        }

    }
);


/* =========================================
   REMOVE PLANT
========================================= */

myGardenPlants.addEventListener(
    "click",
    event => {

        const removeButton =
            event.target.closest(
                ".remove-plant"
            );


        if (!removeButton) {
            return;
        }


        const index =
            Number(
                removeButton.dataset.index
            );


        myGarden.splice(
            index,
            1
        );


        localStorage.setItem(
            gardenUserKey,
            JSON.stringify(
                myGarden
            )
        );


        displayMyGarden();

    }
);


/* =========================================
   DISPLAY PERSONALIZED CARE
========================================= */

function displayPlantCare() {

    const calendarSection =
        document.querySelector(
            ".garden-calendar-section"
        );


    if (!calendarSection) {
        return;
    }


    const oldSection =
        document.getElementById(
            "personalizedCareSection"
        );


    if (oldSection) {
        oldSection.remove();
    }


    if (
        myGarden.length === 0
    ) {
        return;
    }


    const section =
        document.createElement(
            "div"
        );


    section.id =
        "personalizedCareSection";


    section.className =
        "personalized-care-section";


    section.innerHTML = `

        <div class="personalized-care-header">

            <div>

                <h3>
                    Care For Your Garden
                </h3>

                <p>
                    Personalized care suggestions
                    based on the plants you're growing.
                </p>

            </div>

            <i class="bi bi-heart"></i>

        </div>


        <div class="plant-care-list"></div>

    `;


    const careList =
        section.querySelector(
            ".plant-care-list"
        );


    myGarden.forEach(
        (plant, plantIndex) => {

            const tasks =
                plantCareData[
                    plant.name
                ] ||
                plantCareData.default;


            const plantBox =
                document.createElement(
                    "div"
                );


            plantBox.className =
                "plant-care-box";


            plantBox.innerHTML = `

                <div class="plant-care-title">

                    <div class="plant-care-icon">

                        <i class="bi bi-flower1"></i>

                    </div>


                    <div>

                        <h4>
                            ${plant.name}
                        </h4>

                        <span>
                            ${plant.type}
                        </span>

                    </div>

                </div>


                <div class="care-tasks">

                    ${tasks.map(
                        (task, taskIndex) => `

                            <label class="care-task">

                                <input
                                    type="checkbox"
                                    class="care-checkbox"
                                    data-plant="${plantIndex}"
                                    data-task="${taskIndex}"
                                >

                                <span>
                                    ${task}
                                </span>

                            </label>

                        `
                    ).join("")}

                </div>

            `;


            careList.appendChild(
                plantBox
            );

        }
    );


    const myGardenSection =
        document.querySelector(
            ".my-garden-section"
        );


    if (myGardenSection) {

        myGardenSection.after(
            section
        );

    }


    restoreCareTasks();

}


/* =========================================
   SAVE CARE TASKS
========================================= */

function saveCareTasks() {

    const completedCareTasks =
        JSON.parse(
            localStorage.getItem(
                "completedPlantCareTasks"
            )
        ) || {};


    document
        .querySelectorAll(
            ".care-task input"
        )
        .forEach(
            checkbox => {

                const key =
                    `${checkbox.dataset.plant}_${checkbox.dataset.task}`;


                completedCareTasks[key] =
                    checkbox.checked;

            }
        );


    localStorage.setItem(
        "completedPlantCareTasks",
        JSON.stringify(
            completedCareTasks
        )
    );

}


/* =========================================
   RESTORE CARE TASKS
========================================= */

function restoreCareTasks() {

    const saved =
        JSON.parse(
            localStorage.getItem(
                "completedPlantCareTasks"
            )
        ) || {};


    document
        .querySelectorAll(
            ".care-task input"
        )
        .forEach(
            checkbox => {

                const key =
                    `${checkbox.dataset.plant}_${checkbox.dataset.task}`;


                checkbox.checked =
                    saved[key] || false;


                checkbox.addEventListener(
                    "change",
                    saveCareTasks
                );

            }
        );

}


/* =========================================
   GARDEN TASK REMINDER SYSTEM
========================================= */

function checkGardenReminders() {

    const now =
        new Date();


    let reminderShown = false;


    savedTasks.forEach(
        task => {

            if (
                !task.date ||
                !task.time ||
                task.reminded ||
                reminderShown
            ) {
                return;
            }


            const taskDateTime =
                new Date(
                    `${task.date}T${task.time}`
                );


            if (
                now >= taskDateTime
            ) {

                const reminderBox =
                    document.getElementById(
                        "gardenReminder"
                    );


                const reminderText =
                    document.getElementById(
                        "gardenReminderText"
                    );


                if (
                    reminderBox &&
                    reminderText
                ) {

                    reminderText.textContent =
                        `It's time to: ${task.task}`;


                    reminderBox.classList.add(
                        "show"
                    );

                }


                const taskIndex =
                    savedTasks.indexOf(
                        task
                    );


                if (
                    taskIndex !== -1
                ) {

                    savedTasks.splice(
                        taskIndex,
                        1
                    );

                }


                reminderShown = true;

            }

        }
    );


    localStorage.setItem(
        userTaskKey,
        JSON.stringify(
            savedTasks
        )
    );


    displayPersonalTasks();

}


/* =========================================
   CLOSE REMINDER
========================================= */

const closeGardenReminder =
    document.getElementById(
        "closeGardenReminder"
    );


if (closeGardenReminder) {

    closeGardenReminder.addEventListener(
        "click",
        () => {

            const reminderBox =
                document.getElementById(
                    "gardenReminder"
                );


            if (reminderBox) {

                reminderBox.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* =========================================
   CHECK REMINDERS
========================================= */

setInterval(
    checkGardenReminders,
    10000
);


/* =========================================
   INITIAL DISPLAY
========================================= */

displayMonth(
    "January"
);

displayPersonalTasks();

displayMyGarden();