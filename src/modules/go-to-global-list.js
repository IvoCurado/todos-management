import Project from "./project.js";
import state from "./state.js";
import loadTodosUi from "../ui/load-todos-ui.js";

export function goToGlobalList() {
  const allTodosProject = new Project(
    "Global To do's List",
    "This includes all the to do's available on the system."
  );
  const currentProjectsList = state.getState()?.projects;
  const allTodosList = [];
  if (currentProjectsList?.length) {
    for (let i = 0; i < currentProjectsList.length; i++) {
      allTodosList.push(...(currentProjectsList[i]?.todosList ?? []));
    }
  }
  allTodosProject.todosList = allTodosList;
  loadTodosUi(allTodosProject);
}
