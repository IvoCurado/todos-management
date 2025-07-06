export default (function () {
  const localStorage = window.localStorage;

  const updateStorage = function (newState) {
    const stringifiedState = JSON.stringify(newState);
    localStorage.setItem("state", stringifiedState);
  };

  const getStorage = function () {
    const state = localStorage.getItem("state");
    const parsedState = JSON.parse(state) ?? null;
    return parsedState;
  };

  return { updateStorage, getStorage };
})();
