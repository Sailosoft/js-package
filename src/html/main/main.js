import { appConfiguration } from "../../../configurations/app-configuration.js";
import { loadTailwind } from "../../utils/loader/loader.tailwind.js";
import FabMenu from "./main.fab.js";

(function () {
  const STORAGE_KEY = "defaultAppKey";

  // --- Menu Setup ---
  FabMenu.addItem("Clear Default", () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.replace(window.location.pathname); // Refresh to reset state
  });

  FabMenu.addItem("Close Menu", () => {
    FabMenu.close();
  });

  // --- Core Logic ---
  const init = async () => {
    try {
      // 1. Fetch HTML and Alpine Module in parallel for better performance
      // loadTailwind(); // Ensure Tailwind is loaded before fetching HTML that may depend on it
      const [htmlResponse, { Alpine }] = await Promise.all([
        fetch("./src/html/main/main.adm.html"),
        System.import(
          "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/module.esm.js",
        ),
      ]);

      const htmlContent = await htmlResponse.text();
      window.Alpine = Alpine;

      // 2. Define the Alpine Data Component
      Alpine.data("appComponent", () => ({
        appList: [],
        isLoading: false,
        activeAppKey: "",
        currentTime: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        defaultAppKey: localStorage.getItem(STORAGE_KEY) || "",

        init() {
          this.appList = appConfiguration.apps || [];
          console.log("Alpine Initialized with apps:", this.appList);
        },

        launchApp(app) {
          // Clean up global tailwind if present
          // delete window.tailwind;

          this.activeAppKey = app.appKey;
          this.isLoading = true;
          console.log("Launching:", app.appKey);

          if (typeof app.run === "function") {
            app.run();
          }
        },

        setDefaultApp(key) {
          this.defaultAppKey = key;
          localStorage.setItem(STORAGE_KEY, key);
          console.log("Default saved:", key);
        },
      }));

      // 3. Inject and Start
      const appContainer = document.getElementById("app");

      if (!appContainer) {
        throw new Error("Target element #app not found in index.html");
      }

      appContainer.innerHTML = htmlContent;
      Alpine.start();
    } catch (err) {
      console.error("Critical Boot Error:", err);
    }
  };

  // --- Execution Trigger ---
  const savedKey = localStorage.getItem(STORAGE_KEY);
  const defaultApp = savedKey
    ? appConfiguration.apps.find((app) => app.appKey === savedKey)
    : null;

  if (defaultApp) {
    console.log("Auto-launching default app:", savedKey);
    defaultApp.run();
  } else {
    // If no default is set, or the saved key doesn't match an app, show the UI
    if (savedKey) {
      console.warn("Saved key not found in config. Resetting UI...");
    }
    init();
  }
})();
