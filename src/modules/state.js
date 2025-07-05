import localStorage from "./local-storage";

export default (function () {
  let state = {};

  const getState = () => {
    return localStorage.getStorage() ?? state;
  };

  const updateState = (key, value) => {
    state[key] = value;
    localStorage.updateStorage(state);
  };

  return { getState, updateState };
})();
