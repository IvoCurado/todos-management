import Project from "../modules/project.js";
import Todo from "../modules/todo.js";

export default function (currentProject) {
  const contentElement = document.querySelector("#content");
  contentElement.innerHTML = "";
  const contentHeader = document.createElement("div");
  contentHeader.classList = "content-header";
  const title = document.createElement("h2");
  title.classList = "content-title";
  title.textContent = currentProject.title;
  contentHeader.append(title);

  const contentBody = document.createElement("div");
  contentBody.classList = "todos-content-body";

  if (currentProject.todosList?.length) {
    //fill content
    contentBody.textContent = "todos list";
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
