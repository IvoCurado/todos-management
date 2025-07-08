import Project from "../modules/project.js";
import Todo from "../modules/todo.js";
import loadTodoFormUi from "./load-todo-form-ui.js";
import state from "../modules/state.js";

export default function loadTodosUi(currentProject) {
  const contentElement = document.querySelector("#content");
  contentElement.innerHTML = "";
  const contentHeader = document.createElement("div");
  contentHeader.classList = "content-header";
  const title = document.createElement("h2");
  title.classList = "content-title";
  title.textContent = currentProject.title;
  const addToDoButton = document.createElement("button");
  addToDoButton.textContent = "+ Add";
  addToDoButton.classList = "fixed-action primary-button";
  addToDoButton.addEventListener("click", (event) => {
    loadTodoFormUi(currentProject);
  });
  contentHeader.append(
    title,
    currentProject.title === "Global To do's List" ? "" : addToDoButton
  );

  const contentBody = document.createElement("div");
  contentBody.classList = "todos-content-body";

  if (currentProject.todosList?.length) {
    for (let i = 0; i < currentProject.todosList.length; i++) {
      const todoCard = document.createElement("div");
      todoCard.classList = `todo-card card priority-${currentProject.todosList[i].priority}`;
      const todoTitle = document.createElement("h3");
      todoTitle.textContent = currentProject.todosList[i].title;
      const todoDueDate = document.createElement("p");
      todoDueDate.textContent = `Due on: ${currentProject.todosList[i].dueDate}`;
      const nodesToAdd = [todoTitle, todoDueDate];
      const deleteButton = document.createElement("button");
      deleteButton.classList = `delete-button primary-button priority-${currentProject.todosList[i].priority}`;
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        currentProject.todosList.splice(i, 1);
        const newCurrentProjects = [
          ...state
            .getCurrentProjects()
            .filter((project) => project.id !== currentProject.id),
          currentProject,
        ];
        state.updateCurrentProjects(newCurrentProjects);
        loadTodosUi(currentProject);
      });
      if (currentProject.title !== "Global To do's List") {
        nodesToAdd.push(deleteButton);
      }
      todoCard.append(...nodesToAdd);
      contentBody.append(todoCard);
    }
  } else {
    const emptyState = document.createElement("p");
    emptyState.classList = "empty-state";
    emptyState.textContent =
      currentProject.title === "Global To do's List"
        ? "No to do's created yet. If you want to create a to do item please do so within a project."
        : "No to do's created on the current project yet.";
    contentBody.append(emptyState);
  }

  contentElement.append(contentHeader, contentBody);
}
