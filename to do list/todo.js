/* Forest To-Do List – Working Version */

document.addEventListener("DOMContentLoaded", function () {

    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const addTaskBtn = document.getElementById("addTaskBtn");

    const STORAGE_KEY = "forest_tasks";

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    loadTasks();

    function addTask() {
        const text = taskInput.value.trim();
        if (text === "") return;

        const task = {
            id: Date.now(),
            text: text,
            completed: false
        };

        const tasks = getTasks();
        tasks.push(task);
        saveTasks(tasks);

        taskInput.value = "";
        renderTasks();
    }

    function renderTasks() {
    taskList.innerHTML = "";
    const tasks = getTasks();

    tasks.forEach(task => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        /* Task Text */
        const span = document.createElement("span");
        span.textContent = task.text;
        span.style.cursor = "pointer";
        span.addEventListener("click", () => toggleTask(task.id));

        /* Status Badge */
        const status = document.createElement("span");
        status.classList.add("task-status");

        if (task.completed) {
            status.textContent = "Completed";
            status.classList.add("status-completed");
        } else {
            status.textContent = "Pending";
            status.classList.add("status-pending");
        }

        /* Delete Button */
        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.addEventListener("click", () => deleteTask(task.id));

        li.appendChild(span);
        li.appendChild(status);
        li.appendChild(delBtn);

        taskList.appendChild(li);
    });
}


    function toggleTask(id) {
        const tasks = getTasks();
        tasks.forEach(t => {
            if (t.id === id) {
                t.completed = !t.completed;
            }
        });
        saveTasks(tasks);
        renderTasks();
    }

    function deleteTask(id) {
        const tasks = getTasks().filter(t => t.id !== id);
        saveTasks(tasks);
        renderTasks();
    }

    function getTasks() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    function saveTasks(tasks) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    function loadTasks() {
        renderTasks();
    }

});
