
It sounds like you’re building a "Launcher" or "Dashboard" for your software suite—very nostalgic with the DVD menu vibe!

Since you mentioned  **Google Stitch** , I should clarify: if you are referring to the developer tool for stitching together micro-frontends or APIs, you'll need a clean architectural approach. If you meant a different specific tool, the logic below still applies to any web-based index.

Here is a prompt you can use with an AI code generator, followed by the logic for handling defaults and the reset command.

## The AI Generation Prompt

> "Create a web-based 'App Index' dashboard with a retro DVD-player menu aesthetic. The UI should feature a grid or list of clickable application cards.
>
> 1. **Functionality** : When an app is clicked, it should trigger a JavaScript function `launchApp(appName)`.
> 2. **Default Setting** : Each app card should have a small 'Set as Default' button.
> 3. **Persistence** : Use `localStorage` to save the default app.
> 4. **Auto-Load** : On page load, if a default app exists in `localStorage`, automatically trigger the launch function for that app.
> 5. **Styling** : Use a dark theme with neon accents, reminiscent of high-end electronics menus."

---

## Implementation Logic

To make this work, you’ll need a few snippets of JavaScript to handle the "Default" logic and your requested "Reset" feature.

#### 1. The Core Logic (Default & Launch)

This script checks for a saved app on startup and handles the clicking action.

**JavaScript**

```
const apps = ['Editor', 'Analytics', 'Tester', 'Debugger'];

window.onload = () => {
    // Check if a default is set
    const defaultApp = localStorage.getItem('defaultApp');
  
    // Check if the URL has ?reset (your requested feature)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('reset')) {
        resetSystem();
    } else if (defaultApp) {
        launchApp(defaultApp);
    }
};

function launchApp(appName) {
    console.log(`Launching: ${appName}`);
    // Your code to load the app goes here
    // e.g., window.location.href = `/${appName}`;
}

function setAsDefault(appName) {
    localStorage.setItem('defaultApp', appName);
    alert(`${appName} is now your default app!`);
}
```

#### 2. The Reset Commands (URL & Console)

You wanted two ways to clear the settings: a URL query and a console command.

**JavaScript**

```
// 1. The Console Command
// Type 'reset()' in your DevTools console to trigger this
window.reset = function() {
    localStorage.removeItem('defaultApp');
    console.log("Default settings cleared. Reloading...");
    window.location.search = ''; // Clears query params and reloads
};

// 2. The Logic to handle ?reset
function resetSystem() {
    localStorage.removeItem('defaultApp');
    // Remove the ?reset from the URL so it doesn't loop
    window.history.replaceState({}, document.title, window.location.pathname);
    alert("System Reset: Default app removed.");
}
```

---

## How to use the URL Reset

If a user gets "stuck" in a default app and wants back to the index, they just need to type this into their browser address bar:

`yourdomain.com/index.html?reset`

**Would you like me to refine the CSS for that DVD-player look, or perhaps help you structure the "Stitch" configuration for the micro-apps?**
