import Project from "../modules/project.js";
import state from "../modules/state.js";
import loadProjectsUi from "./load-projects-ui.js";

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

  const form = document.createElement("form");
  form.classList = "create-project-form-wrapper";
  const titleLabel = document.createElement("label");
  titleLabel.for = "title";
  titleLabel.textContent = "Title";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.required = true;
  titleInput.maxLength = "50";
  titleInput.id = "title";
  const descriptionLabel = document.createElement("label");
  descriptionLabel.for = "description";
  descriptionLabel.textContent = "Description";
  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.required = true;
  descriptionInput.maxLength = "150";
  descriptionInput.id = "description";

  const actions = document.createElement("div");
  actions.classList = "create-project-actions";
  const cancelButton = document.createElement("button");
  cancelButton.classList = "secondary-button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", (event) => {
    titleInput.value = null;
    descriptionInput.value = null;
    dialog.close();
  });
  const addButton = document.createElement("button");
  addButton.classList = "primary-button";
  addButton.textContent = "Add";
  addButton.type = "submit";
  addButton.addEventListener("click", (event) => {
    if (form.checkValidity() === true) {
      const newProject = new Project(titleInput.value, descriptionInput.value);
      const newCurrentProjects = [...state.getCurrentProjects(), newProject];
      state.updateCurrentProjects(newCurrentProjects);
      loadProjectsUi();
      titleInput.value = null;
      descriptionInput.value = null;
      dialog.close();
    }
  });
  actions.append(cancelButton, addButton);
  form.append(
    titleLabel,
    titleInput,
    descriptionLabel,
    descriptionInput,
    actions
  );

  dialog.append(title, form);

  bodyElement.append(dialog);
  dialog.showModal();
}
