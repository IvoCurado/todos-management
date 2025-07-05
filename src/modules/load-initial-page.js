import Project from "./project.js";
import state from "./state.js";
import loadProjectsUi from "./load-projects-ui.js";
import loadTodosUi from "./load-todos-ui.js";

export default function loadInitialPage() {
  let defaultProject = new Project(
    "Personal",
    "Project with todo's of my daily life."
  );

  state.updateState("projects", [defaultProject]);

  const dueTodayButton = document.getElementById("due-today-button");
  dueTodayButton.addEventListener("click", (event) =>
    loadTodosUi(defaultProject)
  );
  const allProjectsButton = document.getElementById("all-projects-button");
  allProjectsButton.addEventListener("click", (event) => loadProjectsUi());
}
