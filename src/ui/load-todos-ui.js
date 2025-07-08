import Project from "../modules/project.js";
import Todo from "../modules/todo.js";
import loadTodoFormUi from "./load-todo-form-ui.js";

export default function (currentProject) {
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
      todoCard.append(todoTitle, todoDueDate);
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
