const createTodoInput = document.getElementById("new-todo-input");
const todoList = document.getElementById("todo-list");
const searchInput = document.getElementById("search-todo-item-input");

const state = {
  tasks: [],
};

const isTaskExistInTodoList = (text) => {
  for (let index = 0; index < todoList.children.length; index++) {
    const currentTodoItem = todoList.children.item(index);

    if (currentTodoItem.innerText === text) {
      return true;
    }
  }

  return false;
};

const createTask = (value) => {
  const isTaskExist = isTaskExistInTodoList(value);

  if (!isTaskExist) {
    state.tasks = [...state.tasks, { id: Date.now(), value }];

    tasksRender(state.tasks);
  }
};

const getTaskElements = (tasks) => {
  const getTaskElement = ({ id, value }) => `
    <li id="${id}">
      <p>${value}</p>
      <img id="trash_${id}" src="./images/trash-icon.svg" alt="delete" />
    </li>`;

  return tasks.map((task) => getTaskElement(task)).join("");
};

const tasksRender = (tasks) => {
  todoList.innerHTML = getTaskElements(tasks);

  tasks.forEach(({ id }) => {
    document.getElementById(`trash_${id}`).addEventListener("click", () => {
      const filteredStateTasks = state.tasks.filter((task) => task.id !== id);
      const filteredTasks = tasks.filter((task) => task.id !== id);

      state.tasks = filteredStateTasks;

      tasksRender(filteredTasks);
    });
  });
};

createTodoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.currentTarget.value) {
    createTask(event.currentTarget.value);

    event.currentTarget.value = "";
  }
});

searchInput.addEventListener("keyup", (event) => {
  const searchText = event.currentTarget.value;
  const filteredTasks = state.tasks.filter(({ value }) => value.includes(searchText));

  tasksRender(filteredTasks);
});
