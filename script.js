// Utility Functions for LocalStorage
function getLocalData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function setLocalData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Function to Toggle Form Visibility
function toggleForm(formId) {
    const form = document.getElementById(formId);
    form.classList.toggle("form-hidden");
}

// Function to Switch Pages
function showPage(pageId) {
    document.querySelectorAll(".page").forEach((page) => {
        page.classList.remove("active");
    });
    document.getElementById(pageId).classList.add("active");
}

// Event Management
function addEvent(e) {
    e.preventDefault();

    const events = getLocalData("events");
    const newEvent = {
        id: Date.now(), // Unique ID using timestamp
        name: document.getElementById("event-name").value,
        description: document.getElementById("event-description").value,
        location: document.getElementById("event-location").value,
        date: document.getElementById("event-date").value,
    };

    events.push(newEvent);
    setLocalData("events", events);
    displayEvents();
    e.target.reset(); // Reset the form after submission
    toggleForm("event-form"); // Hide the form after submission
}

function deleteEvent(eventId) {
    let events = getLocalData("events");
    events = events.filter((event) => event.id !== eventId);
    setLocalData("events", events);
    displayEvents();
}

function displayEvents() {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = ""; // Clear existing events

    const events = getLocalData("events");
    events.forEach((event) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <h3>${event.name}</h3>
      <p>${event.description}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Date:</strong> ${event.date}</p>
      <button onclick="deleteEvent(${event.id})" class="btn-secondary">Delete</button>
    `;
        eventList.appendChild(card);
    });
}

// Attendee Management
function addAttendee(e) {
    e.preventDefault();

    const attendees = getLocalData("attendees");
    const newAttendee = {
        id: Date.now(), // Unique ID using timestamp
        name: document.getElementById("attendee-name").value,
    };

    attendees.push(newAttendee);
    setLocalData("attendees", attendees);
    displayAttendees();
    e.target.reset(); // Reset the form after submission
    toggleForm("attendee-form"); // Hide the form after submission
}

function deleteAttendee(attendeeId) {
    let attendees = getLocalData("attendees");
    attendees = attendees.filter((attendee) => attendee.id !== attendeeId);
    setLocalData("attendees", attendees);
    displayAttendees();
}

function displayAttendees() {
    const attendeeList = document.getElementById("attendee-list");
    attendeeList.innerHTML = ""; // Clear existing attendees

    const attendees = getLocalData("attendees");
    attendees.forEach((attendee) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <h3>${attendee.name}</h3>
      <button onclick="deleteAttendee(${attendee.id})" class="btn-secondary">Delete</button>
    `;
        attendeeList.appendChild(card);
    });
}

// Task Management
function addTask(e) {
    e.preventDefault();

    const tasks = getLocalData("tasks");
    const newTask = {
        id: Date.now(), // Unique ID using timestamp
        name: document.getElementById("task-name").value,
        deadline: document.getElementById("task-deadline").value,
        status: document.getElementById("task-status").value,
    };

    tasks.push(newTask);
    setLocalData("tasks", tasks);
    displayTasks();
    e.target.reset(); // Reset the form after submission
    toggleForm("task-form"); // Hide the form after submission
}

function updateTaskStatus(taskId, newStatus) {
    const tasks = getLocalData("tasks");
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].status = newStatus;
        setLocalData("tasks", tasks);
        displayTasks();
    }
}

function deleteTask(taskId) {
    let tasks = getLocalData("tasks");
    tasks = tasks.filter((task) => task.id !== taskId);
    setLocalData("tasks", tasks);
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear existing tasks

    const tasks = getLocalData("tasks");
    tasks.forEach((task) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <h3>${task.name}</h3>
      <p><strong>Deadline:</strong> ${task.deadline}</p>
      <p><strong>Status:</strong> ${task.status}</p>
      <div>
        <button onclick="updateTaskStatus(${task.id}, 'Completed')" class="btn-primary">Mark Completed</button>
        <button onclick="deleteTask(${task.id})" class="btn-secondary">Delete</button>
      </div>
    `;
        taskList.appendChild(card);
    });
}

// Initial Data Display
window.onload = () => {
    displayEvents();
    displayAttendees();
    displayTasks();
};
