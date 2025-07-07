export default class Project {
  #todosList = [];

  constructor(title, description) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
  }

  get todosList() {
    return this.#todosList;
  }

  set todosList(newList) {
    this.#todosList = newList;
  }
}
