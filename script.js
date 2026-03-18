let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let xp = parseInt(localStorage.getItem("xp")) || 0;

function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("xp", xp);
}

function addTask() {
    const name = document.getElementById("taskName").value;
    const hours = parseFloat(document.getElementById("taskHours").value);
    const priority = document.getElementById("taskPriority").value;

    if (!name || !hours) return;

    tasks.push({
        name,
        hours,
        priority,
        completed: false,
        date: new Date().toLocaleDateString()
    });

    saveData();
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    let totalHours = 0;

    tasks.forEach((task, index) => {

        if (task.completed) totalHours += task.hours;

        const li = document.createElement("li");
        li.innerHTML = `
            ${task.name} - ${task.hours}h - ${task.priority}
            <button onclick="completeTask(${index})">✔</button>
        `;
        list.appendChild(li);
    });

    document.getElementById("totalHours").innerText = totalHours;
    document.getElementById("xp").innerText = xp;
    document.getElementById("level").innerText = Math.floor(xp / 100) + 1;
}

function completeTask(index) {
    if (!tasks[index].completed) {
        tasks[index].completed = true;
        xp += tasks[index].hours * 10;
        saveData();
        renderTasks();
    }
}

function exportCSV() {
    let csv = "Date,Task,Hours,Priority,Completed\n";
    tasks.forEach(task => {
        csv += `${task.date},${task.name},${task.hours},${task.priority},${task.completed}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "study_data.csv";
    a.click();
}

document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
});

renderTasks();

