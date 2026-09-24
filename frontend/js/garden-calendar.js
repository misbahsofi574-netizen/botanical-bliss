console.log("GARDEN CALENDAR JS LOADED");

/* =========================================
   MONTH DATA
========================================= */

const monthData = {

    January: {
        description: "Start the year by planning your garden and preparing your soil for the coming season.",
        tasks: [
            "Plan your garden layout",
            "Prepare and enrich the soil",
            "Remove weeds and dead plants",
            "Start seeds for suitable seasonal plants"
        ]
    },

    February: {
        description: "February is a good time to prepare for spring planting and care for growing plants.",
        tasks: [
            "Plant suitable vegetables and herbs",
            "Add organic compost to the soil",
            "Check plants for pests",
            "Water plants regularly"
        ]
    },

    March: {
        description: "Give your garden extra attention as temperatures begin to rise.",
        tasks: [
            "Plant flowering plants",
            "Grow herbs and vegetables",
            "Increase watering when needed",
            "Remove damaged leaves"
        ]
    },

    April: {
        description: "Protect your plants from increasing heat and maintain proper watering.",
        tasks: [
            "Water plants in the morning or evening",
            "Add mulch around plants",
            "Protect delicate plants from strong sunlight",
            "Check regularly for pests"
        ]
    },

    May: {
        description: "Hot weather requires careful watering and protection for your garden.",
        tasks: [
            "Water plants regularly",
            "Use mulch to retain soil moisture",
            "Provide shade for sensitive plants",
            "Avoid overwatering"
        ]
    },

    June: {
        description: "The monsoon season is a great opportunity for planting and natural garden growth.",
        tasks: [
            "Plant suitable monsoon crops",
            "Improve soil drainage",
            "Remove standing water",
            "Check plants for fungal growth"
        ]
    },

    July: {
        description: "Keep your garden healthy during the rainy season by managing moisture and pests.",
        tasks: [
            "Monitor plants after heavy rain",
            "Remove excess water",
            "Add compost when needed",
            "Check leaves for diseases"
        ]
    },

    August: {
        description: "Continue caring for plants during the rainy season and maintain good drainage.",
        tasks: [
            "Prune damaged branches",
            "Remove weeds",
            "Check soil drainage",
            "Inspect plants for pests"
        ]
    },

    September: {
        description: "Prepare your garden for the transition from monsoon to the next growing season.",
        tasks: [
            "Clean garden beds",
            "Add organic compost",
            "Plant suitable seasonal flowers",
            "Remove unhealthy plant parts"
        ]
    },

    October: {
        description: "October is ideal for preparing the garden for cooler weather and seasonal flowering plants.",
        tasks: [
            "Plant winter-season flowers",
            "Prepare vegetable beds",
            "Add compost to the soil",
            "Prune overgrown plants"
        ]
    },

    November: {
        description: "Enjoy the cooler weather and focus on growing vegetables, herbs and flowers.",
        tasks: [
            "Plant winter vegetables",
            "Grow herbs",
            "Water plants according to their needs",
            "Remove weeds regularly"
        ]
    },

    December: {
        description: "End the year by maintaining your garden and planning for the next gardening season.",
        tasks: [
            "Clean garden tools",
            "Remove dead leaves",
            "Protect sensitive plants from cold",
            "Plan next year's garden"
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
   COMPLETED MONTHLY TASKS
========================================= */

let completedTasks =
    JSON.parse(
        localStorage.getItem("completedGardenTasks")
    ) || {};


/* =========================================
   DISPLAY MONTH
========================================= */

function displayMonth(month) {

    const data = monthData[month];

    if (!data) {
        return;
    }

    calendarMonth.textContent = month;

    calendarDescription.textContent =
        data.description;

    gardenTasks.innerHTML = "";

    const completed =
        completedTasks[month]
            ? completedTasks[month].length
            : 0;

    const total = data.tasks.length;

    const percentage =
        Math.round((completed / total) * 100);


    /* PROGRESS */

    const progressBox =
        document.createElement("div");

    progressBox.className =
        "garden-progress";

    progressBox.innerHTML = `
        <div class="progress-info">
            <span>Gardening Progress</span>

            <strong>
                ${completed} of ${total} completed
            </strong>
        </div>

        <div class="progress-bar">
            <div
                class="progress-fill"
                style="width: ${percentage}%"
            ></div>
        </div>
    `;

    gardenTasks.appendChild(progressBox);


    /* MONTHLY TASKS */

    data.tasks.forEach((task, index) => {

        const taskItem =
            document.createElement("div");

        taskItem.className =
            "garden-task";

        const isCompleted =
            completedTasks[month] &&
            completedTasks[month].includes(index);

        if (isCompleted) {
            taskItem.classList.add("completed");
        }

        taskItem.innerHTML = `
            <button
                class="garden-task-check"
                type="button"
            >
                <i class="bi ${
                    isCompleted
                        ? "bi-check-circle-fill"
                        : "bi-circle"
                }"></i>
            </button>

            <span>${task}</span>
        `;

        const checkButton =
            taskItem.querySelector(
                ".garden-task-check"
            );

        checkButton.addEventListener(
            "click",
            () => {
                toggleTask(month, index);
            }
        );

        gardenTasks.appendChild(taskItem);

    });

}


/* =========================================
   TOGGLE MONTHLY TASK
========================================= */

function toggleTask(month, index) {

    if (!completedTasks[month]) {
        completedTasks[month] = [];
    }

    const position =
        completedTasks[month].indexOf(index);

    if (position === -1) {

        completedTasks[month].push(index);

    } else {

        completedTasks[month].splice(position, 1);

    }

    localStorage.setItem(
        "completedGardenTasks",
        JSON.stringify(completedTasks)
    );

    displayMonth(month);

}


/* =========================================
   MONTH BUTTONS
========================================= */

monthButtons.forEach(button => {

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

            button.classList.add("active");

            displayMonth(
                button.dataset.month
            );

        }
    );

});


/* =========================================
   PERSONAL GARDENING TASKS
========================================= */

const personalTaskInput =
    document.getElementById("personalTaskInput");

const personalTaskDate =
    document.getElementById("personalTaskDate");

const personalTaskTime =
    document.getElementById("personalTaskTime");

const addPersonalTask =
    document.getElementById("addPersonalTask");

const personalTasks =
    document.getElementById("personalTasks");

    console.log("Task Input:", personalTaskInput);
console.log("Task Date:", personalTaskDate);
console.log("Task Time:", personalTaskTime);
console.log("Add Button:", addPersonalTask);
console.log("Task Container:", personalTasks);

const currentUser = JSON.parse(localStorage.getItem("user"));
const userTaskKey = currentUser
    ? `gardenPersonalTasks_${currentUser._id || currentUser.id || currentUser.email}`
    : "gardenPersonalTasks";

let savedTasks =
    JSON.parse(localStorage.getItem(userTaskKey)) || [];


// Convert old tasks into the new format
savedTasks = savedTasks.map(task => {

    if (typeof task === "string") {
        return {
            task: task,
            date: "",
            time: ""
        };
    }

    return task;
});


// Display personal tasks
function displayPersonalTasks() {

    personalTasks.innerHTML = "";

    savedTasks.forEach((task, index) => {

        const taskItem = document.createElement("div");

        taskItem.className = "personal-task";

        let scheduleText = "";

        if (task.date && task.time) {

            scheduleText = `
                <small>
                    <i class="bi bi-calendar-event"></i>
                    ${task.date} at ${task.time}
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

                    <span>${task.task}</span>

                    ${scheduleText}

                </div>

            </div>


            <button
                class="delete-personal-task"
                data-index="${index}"
                title="Delete task"
            >

                <i class="bi bi-trash"></i>

            </button>

        `;


        personalTasks.appendChild(taskItem);

    });
}



// Add a new personal task

// Add a new personal task
addPersonalTask.addEventListener("click", async () => {

    const task = personalTaskInput.value.trim();
    const date = personalTaskDate.value;
    const time = personalTaskTime.value;

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    if (date === "") {
        alert("Please select a date.");
        return;
    }

    if (time === "") {
        alert("Please select a time.");
        return;
    }


    // Check if user is logged in
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login before scheduling a reminder.");
        window.location.href = "login.html";
        return;
    }


    // Save reminder to backend
    try {

        const response = await fetch(
            "http://localhost:5000/api/garden-reminders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    task: task,
                    date: date,
                    time: time
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to schedule gardening reminder."
            );

            return;
        }


        // Save locally for displaying in Garden Calendar
        const newTask = {
            task: task,
            date: date,
            time: time
        };

        savedTasks.push(newTask);

        localStorage.setItem(
    userTaskKey,
    JSON.stringify(savedTasks)
);


        // Clear inputs
        personalTaskInput.value = "";
        personalTaskDate.value = "";
        personalTaskTime.value = "";


        displayPersonalTasks();


        alert(
            "Gardening task scheduled successfully! 🌱\n" +
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

});

// Press Enter to add task
personalTaskInput.addEventListener("keypress", event => {

    if (event.key === "Enter") {

        addPersonalTask.click();

    }

});


// Delete personal task
personalTasks.addEventListener("click", event => {

    const deleteButton =
        event.target.closest(".delete-personal-task");


    if (!deleteButton) return;


    const index =
        Number(deleteButton.dataset.index);


    savedTasks.splice(index, 1);


    localStorage.setItem(
    userTaskKey,
    JSON.stringify(savedTasks)
);

    displayPersonalTasks();

});


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

let myGarden =
    JSON.parse(
        localStorage.getItem(
            "myGardenPlants"
        )
    ) || [];

    
// Remove duplicate plants from existing saved data
myGarden = myGarden.filter(
    (plant, index, self) =>
        index ===
        self.findIndex(
            p =>
                p.name.toLowerCase() ===
                plant.name.toLowerCase()
        )
);

// Save cleaned garden data
localStorage.setItem(
    userTaskKey,
    JSON.stringify(savedTasks)
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


    if (myGarden.length === 0) {

        myGardenPlants.innerHTML = `
            <div class="empty-garden">

                <i class="bi bi-flower1"></i>

                <p>Your garden is empty.</p>

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
                document.createElement("div");

            plantCard.className =
                "garden-plant-card";

            plantCard.innerHTML = `
                <div class="plant-icon">
                    <i class="bi bi-flower1"></i>
                </div>

                <div class="plant-info">

                    <h4>${plant.name}</h4>

                    <span>
                        ${plant.type}
                    </span>

                </div>

                <button
                    class="remove-plant"
                    data-index="${index}"
                    title="Remove plant"
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

    // Check if the plant already exists
    const alreadyExists = myGarden.some(
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

    // Add new plant
    myGarden.push({
        name: name,
        type: type
    });

    localStorage.setItem(
        "myGardenPlants",
        JSON.stringify(myGarden)
    );

    plantNameInput.value = "";
    plantTypeInput.value = "";

    displayMyGarden();
}
addPlantButton.addEventListener(
    "click",
    addPlant
);


plantNameInput.addEventListener(
    "keypress",
    event => {

        if (event.key === "Enter") {
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
            "myGardenPlants",
            JSON.stringify(myGarden)
        );


        displayMyGarden();

    }
);

function displayPlantCare() {

    const calendarSection = document.querySelector(
        ".garden-calendar-section"
    );

    if (!calendarSection) {
        console.log("Garden calendar section not found.");
        return;
    }

    // Remove old care section
    const oldSection = document.getElementById(
        "personalizedCareSection"
    );

    if (oldSection) {
        oldSection.remove();
    }

    // No plants = nothing to show
    if (myGarden.length === 0) {
        console.log("No plants in My Garden.");
        return;
    }

    console.log("Creating Care For Your Garden section...");

    const section = document.createElement("div");

    section.id = "personalizedCareSection";
    section.className = "personalized-care-section";

    section.innerHTML = `
        <div class="personalized-care-header">
            <div>
                <h3>Care For Your Garden</h3>
                <p>
                    Personalized care suggestions
                    based on the plants you're growing.
                </p>
            </div>

            <i class="bi bi-heart"></i>
        </div>

        <div class="plant-care-list"></div>
    `;

    const careList = section.querySelector(
        ".plant-care-list"
    );

    myGarden.forEach((plant, plantIndex) => {

        const tasks =
            plantCareData[plant.name] ||
            plantCareData.default;

        const plantBox =
            document.createElement("div");

        plantBox.className =
            "plant-care-box";

        plantBox.innerHTML = `
            <div class="plant-care-title">

                <div class="plant-care-icon">
                    <i class="bi bi-flower1"></i>
                </div>

                <div>
                    <h4>${plant.name}</h4>
                    <span>${plant.type}</span>
                </div>

            </div>

            <div class="care-tasks">

                ${tasks.map((task, taskIndex) => `
                    <label class="care-task">

                        <input
                            type="checkbox"
                            class="care-checkbox"
                            data-plant="${plantIndex}"
                            data-task="${taskIndex}"
                        >

                        <span>${task}</span>

                    </label>
                `).join("")}

            </div>
        `;

        careList.appendChild(plantBox);
    });

    // Put Care For Your Garden AFTER My Garden
   const myGardenSection = document.querySelector(".my-garden-section");

if (myGardenSection) {
    myGardenSection.after(section);
}

    restoreCareTasks();

    console.log(
        "Care For Your Garden added successfully."
    );
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
   INITIAL DISPLAY
========================================= */


displayPersonalTasks();

displayMyGarden();

// ===============================
// GARDEN TASK REMINDER SYSTEM
// ===============================

function checkGardenReminders() {

    const now = new Date();

    savedTasks.forEach(task => {

        if (!task.date || !task.time || task.reminded) {
            return;
        }

        const taskDateTime =
            new Date(`${task.date}T${task.time}`);

        if (now >= taskDateTime) {

            const reminderBox =
                document.getElementById("gardenReminder");

            const reminderText =
                document.getElementById("gardenReminderText");

            if (reminderBox && reminderText) {

                reminderText.textContent =
                    `It's time to: ${task.task}`;

                reminderBox.classList.add("show");

            }

            const taskIndex =
    savedTasks.indexOf(task);

if (taskIndex !== -1) {

    savedTasks.splice(taskIndex, 1);

    displayPersonalTasks();

}

        }

    });

    localStorage.setItem(
        "gardenPersonalTasks",
        JSON.stringify(savedTasks)
    );
}

const closeGardenReminder =
    document.getElementById("closeGardenReminder");

closeGardenReminder.addEventListener("click", () => {

    const reminderBox =
        document.getElementById("gardenReminder");

    reminderBox.classList.remove("show");

});

setInterval(checkGardenReminders, 10000);