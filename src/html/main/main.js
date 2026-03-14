window.__main = {
  launchApp(appName) {
    const statusText = document.getElementById("status-text");
    statusText.innerText = `Launching ${appName}...`;
  },
};
console.log(window);
