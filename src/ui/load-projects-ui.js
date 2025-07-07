import state from "../modules/state.js";
import loadTodosUi from "./load-todos-ui.js";
import loadProjectFormUi from "./load-project-form-ui.js";

export default function loadProjectsUi() {
  const contentElement = document.querySelector("#content");
  contentElement.innerHTML = "";
  const contentHeader = document.createElement("div");
  contentHeader.classList = "content-header";
  const title = document.createElement("h2");
  title.classList = "content-title";
  title.textContent = "Projects";
  const addProjectButton = document.createElement("button");
  addProjectButton.textContent = "+ Add";
  addProjectButton.classList = "fixed-action primary-button";
  addProjectButton.addEventListener("click", (event) => {
    loadProjectFormUi();
  });
  contentHeader.append(title, addProjectButton);

  const contentBody = document.createElement("div");
  contentBody.classList = "content-body";

  const currentProjectsList = state.getState()?.projects;

  if (currentProjectsList?.length) {
    for (let i = 0; i < currentProjectsList.length; i++) {
      const projectCard = document.createElement("div");
      projectCard.classList = "project-card card";
      projectCard.addEventListener("click", (event) => {
        loadTodosUi(currentProjectsList[i]);
      });
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList = "delete-button primary-button";
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        currentProjectsList.splice(i, 1);
        state.updateCurrentProjects(currentProjectsList);
        loadProjectsUi();
      });

      const projectTitle = document.createElement("h3");
      projectTitle.textContent = `${currentProjectsList[i].title}`;
      const projectDescription = document.createElement("p");
      projectDescription.textContent = `${currentProjectsList[i].description}`;
      projectCard.append(projectTitle, projectDescription, deleteButton);
      contentBody.append(projectCard);
    }
  } else {
    const emptyState = document.createElement("p");
    emptyState.classList = "empty-state";
    emptyState.textContent = "No projects created yet.";
    contentBody.append(emptyState);
  }

  contentElement.append(contentHeader, addProjectButton, contentBody);
}
