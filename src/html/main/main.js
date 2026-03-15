window.__main = {
  launchApp(appName) {
    const statusText = document.getElementById("status-text");
    statusText.innerText = `Launching ${appName}...`;
  },
};
console.log(window);

(function () {
  const DEFAULT_APP = "defaultApp";

  const defaultApp = localStorage.getItem(DEFAULT_APP);

  function getTemplate() {
    
  }

  if (!defaultApp) {

  }
})();
