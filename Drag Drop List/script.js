function addTask(box) {
    const inputId = box === "today" ? "today-input" : "tomorrow-input";
    const listId = box === "today" ? "today-tasks" : "tomorrow-tasks";

    const input = document.getElementById(inputId);
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty.");
        return;
    }

    const task = document.createElement("div");
    task.className = "task";
    task.id = `task-${Date.now()}`; 
    task.draggable = true;

    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = () => task.remove();

    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);

    task.appendChild(taskContent);
    task.appendChild(removeBtn);

    document.getElementById(listId).appendChild(task);
    input.value = "";
}

function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    setTimeout(() => {
        event.target.style.display = "none";
    }, 0);
}

function dragEnd(event) {
    event.target.style.display = "block";
}

document.querySelectorAll(".task-list").forEach((list) => {
    list.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    list.addEventListener("drop", (event) => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData("text/plain");
        const task = document.querySelector(`#${taskId}`);
        if (task) {
            list.appendChild(task);
        }
    });
});
