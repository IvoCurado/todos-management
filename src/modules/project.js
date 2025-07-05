export default class Project {
  #todosList = [];

  constructor(title, description) {
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
