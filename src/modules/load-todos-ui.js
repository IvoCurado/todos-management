import Project from "./project.js";

export default function (currentProject) {
  let contentElement = document.querySelector("#content");
  contentElement.innerHTML = `<p>${currentProject.title}</p>`;
}
