import state from "./state.js";
import loadTodosUi from "./load-todos-ui";

export default function () {
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
    console.log("new 1");
  });
  contentHeader.append(title, addProjectButton);

  const contentBody = document.createElement("div");
  contentBody.classList = "content-body";

  const currentProjectsList = state.getState()?.projects;
  for (let i = 0; i < currentProjectsList.length ?? 0; i++) {
    const projectCard = document.createElement("div");
    projectCard.classList = "project-card card";
    projectCard.addEventListener("click", (event) => {
      loadTodosUi(currentProjectsList[i]);
    });
    const projectTitle = document.createElement("h3");
    projectTitle.textContent = `${currentProjectsList[i].title}`;
    const projectDescription = document.createElement("p");
    projectDescription.textContent = `${currentProjectsList[i].description}`;
    projectCard.append(projectTitle, projectDescription);
    contentBody.append(projectCard);
  }

  contentElement.append(contentHeader, addProjectButton, contentBody);
}
