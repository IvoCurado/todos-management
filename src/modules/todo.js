export default class Todo {
  #isCompleted = false;

  constructor(title, description, dueDate, priority, notes) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
  }

  get isCompleted() {
    return this.#isCompleted;
  }

  set isCompleted(isCompleted) {
    this.#isCompleted = isCompleted;
  }
}
