import Project from "../modules/project.js";
import Todo from "../modules/todo.js";

export default function (currentProject) {
  const loadedDialog = document.querySelector("#create-project-dialog");
  if (loadedDialog) {
    loadedDialog.showModal();
    return;
  }

  const bodyElement = document.querySelector("body");
  const dialog = document.createElement("dialog");
  dialog.id = "create-project-dialog";
  dialog.classList = "project-form-dialog";

  const title = document.createElement("h3");
  title.textContent = "Add a new Project";

  const form = document.createElement("div");
  form.classList = "create-project-form-wrapper";

  const actions = document.createElement("div");
  actions.classList = "create-project-actions";
  const cancelButton = document.createElement("button");
  cancelButton.classList = "secondary-button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", (event) => dialog.close());
  const addButton = document.createElement("button");
  addButton.classList = "primary-button";
  addButton.textContent = "Add";
  addButton.addEventListener("click", (event) => dialog.close());
  actions.append(cancelButton, addButton);

  dialog.append(title, form, actions);

  bodyElement.append(dialog);
  dialog.showModal();
}
