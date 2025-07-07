import localStorage from "./local-storage";

export default (function () {
  let state = {};

  const getState = () => {
    return localStorage.getStorage() ?? state;
  };

  const getCurrentProjects = () => {
    const currentState = localStorage.getStorage() ?? state;
    return currentState?.projects ?? [];
  };

  const updateCurrentProjects = (newProjects) => {
    state["projects"] = newProjects;
    localStorage.updateStorage(state);
  };

  const getCurrentTodosList = (projectId) => {
    const currentState = localStorage.getStorage() ?? state;
    return (
      currentState?.projects?.filter((project) => project.id === projectId)?.[0]
        ?.todosList ?? []
    );
  };

  const updateState = (key, value) => {
    state[key] = value;
    localStorage.updateStorage(state);
  };

  return { getState, updateState, getCurrentProjects, updateCurrentProjects, getCurrentTodosList };
})();
