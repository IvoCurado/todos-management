export default class Todo {
  #isCompleted = false;

  constructor(title, description, dueDate, priority, notes, checkList) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checkList = checkList;
  }

  get isCompleted() {
    return this.#isCompleted;
  }

  set isCompleted(isCompleted) {
    this.#isCompleted = isCompleted;
  }

  get priority() {
    return this.priority;
  }

  set priority(priority) {
    this.priority = priority;
  }
}
