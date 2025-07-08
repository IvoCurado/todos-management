import Todo from "../modules/todo.js";
import Project from "../modules/project.js";
import state from "../modules/state.js";
import loadTodosUi from "./load-todos-ui.js";

export default function (currentProject, currentTodo) {
  const loadedDialog = document.querySelector("#create-todo-dialog");
  if (loadedDialog) {
    loadedDialog.remove();
  }

  const bodyElement = document.querySelector("body");
  const dialog = document.createElement("dialog");
  dialog.id = "create-todo-dialog";
  dialog.classList = "todo-form-dialog edit-mode";

  const title = document.createElement("h3");
  title.textContent = "Edit the To do";

  const form = document.createElement("form");
  form.classList = "create-todo-form-wrapper";
  const titleLabel = document.createElement("label");
  titleLabel.for = "title";
  titleLabel.textContent = "Title";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.required = true;
  titleInput.maxLength = "50";
  titleInput.id = "title";
  titleInput.value = currentTodo.title;
  const descriptionLabel = document.createElement("label");
  descriptionLabel.for = "description";
  descriptionLabel.textContent = "Description";
  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.required = true;
  descriptionInput.maxLength = "150";
  descriptionInput.id = "description";
  descriptionInput.value = currentTodo.description;
  const dueDateLabel = document.createElement("label");
  dueDateLabel.for = "dueDate";
  dueDateLabel.textContent = "Due Date";
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.required = true;
  dueDateInput.id = "dueDate";
  dueDateInput.value = currentTodo.dueDate;
  const priorityLabel = document.createElement("label");
  priorityLabel.for = "priority";
  priorityLabel.textContent = "Priority";
  const priorityInput = document.createElement("select");
  priorityInput.required = true;
  const lowPriorityOption = document.createElement("option");
  lowPriorityOption.value = "low";
  lowPriorityOption.textContent = "Low";
  const mediumPriorityOption = document.createElement("option");
  mediumPriorityOption.value = "medium";
  mediumPriorityOption.textContent = "Medium";
  const highPriorityOption = document.createElement("option");
  highPriorityOption.value = "high";
  highPriorityOption.textContent = "High";
  priorityInput.id = "priority";
  priorityInput.append(
    lowPriorityOption,
    mediumPriorityOption,
    highPriorityOption
  );
  priorityInput.value = currentTodo.priority;
  const notesLabel = document.createElement("label");
  notesLabel.for = "notes";
  notesLabel.textContent = "Notes";
  const notesInput = document.createElement("input");
  notesInput.type = "text";
  notesInput.required = true;
  notesInput.maxLength = "250";
  notesInput.id = "notes";
  notesInput.value = currentTodo.notes;

  const actions = document.createElement("div");
  actions.classList = "create-todo-actions";
  const cancelButton = document.createElement("button");
  cancelButton.classList = "secondary-button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
  });
  const addButton = document.createElement("button");
  addButton.classList = "primary-button";
  addButton.textContent = "Edit";
  addButton.type = "submit";
  addButton.addEventListener("click", (event) => {
    if (form.checkValidity() === true) {
      const newTodo = new Todo(
        titleInput.value,
        descriptionInput.value,
        dueDateInput.value,
        priorityInput.value,
        notesInput.value
      );
      const newCurrentTodos = [
        newTodo,
        ...state
          .getCurrentTodosList(currentProject.id)
          .filter((todo) => todo.id !== currentTodo.id),
      ];
      currentProject.todosList = newCurrentTodos;
      const newCurrentProjects = [
        currentProject,
        ...state
          .getCurrentProjects()
          .filter((project) => project.id !== currentProject.id),
      ];
      state.updateCurrentProjects(newCurrentProjects);
      loadTodosUi(currentProject);
      titleInput.value = null;
      descriptionInput.value = null;
      notesInput.value = null;
      dueDateInput.value = null;
      priorityInput.value = "low";
      dialog.close();
    }
  });
  actions.append(cancelButton, addButton);
  form.append(
    titleLabel,
    titleInput,
    descriptionLabel,
    descriptionInput,
    dueDateLabel,
    dueDateInput,
    priorityLabel,
    priorityInput,
    notesLabel,
    notesInput,
    actions
  );

  dialog.append(title, form);

  bodyElement.append(dialog);
  dialog.showModal();
}
