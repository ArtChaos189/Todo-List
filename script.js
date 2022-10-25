//Нажатие добовление задачи по Enter
document.getElementById("add").addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    document.getElementById("add").click();
  }
});

document.getElementById("add").onclick = function () {};

const dom = {
  new: document.getElementById("new"),
  add: document.getElementById("add"),
  task: document.getElementById("task"),
};

const tasks = [];

// отслеживаем клик по кнопке добавить задачу
dom.add.onclick = () => {
  const newTaskText = dom.new.value;
  if (newTaskText && isNotHavetask(newTaskText, tasks)) {
    addTask(newTaskText, tasks);
    dom.new.value = "";
    tasksRender(tasks);
  }
};

// Функция добавления задач
function addTask(text, list) {
  const timestamp = Date.now();
  const task = {
    id: timestamp,
    text,
    isComplete: false,
  };
  list.push(task);
}

//Проверка существовани задачи в массиве задач
function isNotHavetask(text, list) {
  let isNotHave = true;

  list.forEach((task) => {
    if (task.text === text) {
      alert("Task already exists");
      isNotHave = false;
    }
  });

  return isNotHave;
}

// функция вывода списка задача
function tasksRender(list) {
  let htmlList = "";

  list.forEach((task) => {
    const taskHtml = `
        <div id="${task.id}" class="todo_list">
        <div class="todo_task">
          <div class="todo_task-title">${task.text}</div>
          <div class="todo_task-del"></div>
        </div>
        `;

    htmlList = htmlList + taskHtml;
  });
  dom.task.innerHTML = htmlList;
}

dom.task.onclick = (event) => {
  const target = event.target;
  const isDeleteEl = target.classList.contains("todo_task-del");

  if (isDeleteEl) {
    const task = target.parentElement.parentElement;
    const taskId = task.getAttribute("id");
    deleteTask(taskId, tasks);
    tasksRender(tasks);
  }
};

//Функция удаления
function deleteTask(id, list) {
  list.forEach((task, idx) => {
    if (task.id == id) {
      list.splice(idx, 1);
    }
  });
}

//Поиск в списке задач
window.onload = () => {
  let input = document.querySelector("#input");
  input.oninput = function () {
    let value = this.value.trim();
    let list = document.querySelectorAll(".todo_task");

    if (value != "") {
      list.forEach((elem) => {
        if (elem.innerText.search(value) == -1) {
          elem.classList.add("hide");
        }
      });
    } else {
      list.forEach((elem) => {
        elem.classList.remove("hide");
      });
    }
  };
};
