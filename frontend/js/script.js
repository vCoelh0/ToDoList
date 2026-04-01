const addButton = document.getElementById("add-task-btn");

const inputTask = document.getElementById("task-input");
const allTasks = document.getElementById("task-list");

let taskList = []

function addTask() {

    if(inputTask.value === ""){
        alert("Não é possivel adicionar uma tarefa vazia")
    }else{
        
        taskList.push({
            tarefa: inputTask.value,
            concluida: false
        });
    
        inputTask.value = "";
        showTasks();
    }

}

function showTasks() {
    let newTask = "";

    taskList.forEach((task, i) => {
        newTask += `
        <li class="task-card ${task.concluida ? "done" : ""} p-3">
            <span class="task-text fw-semibold text-white">${task.tarefa}</span>
            <div class="task-actions d-flex gap-2">
                <button type="button" class="btn btn-success" onclick="doneTask(${i})">
                    <i class="bi bi-check"></i>
                </button>
                <button type="button" class="btn btn-danger delete-btn" onclick="deleteTask(${i})">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
        </li>
        `
    })

    allTasks.innerHTML = newTask;

    localStorage.setItem("tasks", JSON.stringify(taskList))
}

function deleteTask(i){
    taskList.splice(i, 1)
    showTasks()
}

function doneTask(i){
    taskList[i].concluida = !taskList[i].concluida
    showTasks()
}

function resetTasks(){
    const localStoragetasks = localStorage.getItem("tasks")
    
    if(localStoragetasks){
        taskList = JSON.parse(localStoragetasks)  
    }

    showTasks()
}

resetTasks()
addButton.addEventListener("click", addTask);