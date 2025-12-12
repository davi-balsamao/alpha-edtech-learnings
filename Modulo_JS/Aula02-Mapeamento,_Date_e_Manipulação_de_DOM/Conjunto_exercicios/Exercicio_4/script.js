const taskListUI = document.getElementById("task-list");
const inputTask = document.getElementById("input-task");
const todoForm = document.getElementById("todo-form");

todoForm.addEventListener("submit", function(event) {
    
    event.preventDefault();

    const task = inputTask.value;

    if (task.trim() === "") return;

    taskListUI.innerHTML += `<li>${task}</li>`;

    inputTask.value = "";
});