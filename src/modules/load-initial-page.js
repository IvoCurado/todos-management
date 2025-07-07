import Project from "./project.js";
import Todo from "./todo.js";
import state from "./state.js";
import loadProjectsUi from "../ui/load-projects-ui.js";
import loadTodosUi from "../ui/load-todos-ui.js";
import { goToGlobalList } from "./go-to-global-list.js";

export default function loadInitialPage() {
  const currentState = state.getState();
  if (Object.keys(currentState).length === 0) {
    let defaultProject = new Project(
      "Personal",
      "Project with todo's of my daily life."
    );
    const x = new Todo(
      "titleInput.value",
      "descriptionInput.value",
      "dueDateInput.value",
      "low",
      "notesInput.value"
    );
    defaultProject.todosList = [x];

    state.updateState("projects", [defaultProject]);
  }

  const scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const allTodosButton = document.getElementById("global-button");
  allTodosButton.addEventListener("click", (event) => {
    goToGlobalList();
    scrollToTop();
  });
  const allProjectsButton = document.getElementById("all-projects-button");
  allProjectsButton.addEventListener("click", (event) => {
    loadProjectsUi();
    scrollToTop();
  });
  goToGlobalList();
}
