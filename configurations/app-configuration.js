export const appConfiguration = {
  apps: [
    {
      appName: "React App",
      appKey: "react-app",
      icon: "code",
      description: "FirstReact Application",
      async run() {
        console.log("Attempt to run")
        if (!window.tailwind) {
          window.tailwind = {
            config: {
              important: ".tw-scope", // Re-apply your scope
              corePlugins: {
                preflight: false,
              },
            },
          };
          loadScript(
            "https://cdn.tailwindcss.com?plugins=forms,container-queries",
          );
        }

        console.log("Loading React App...");
        await loadScript(
          "dependencies/react-projects/react-19.json",
          "systemjs-importmap",
        );
        console.log("React App Loaded.");
        console.log("Importing React App Module...");
        System.import("./src/react/main/App.tsx").then((module) => {
          console.log(module);
        });
      },
    },
  ],
};
export async function loadScript(src, type) {
  if (type === "systemjs-importmap") {
    // 1. Fetch the JSON file manually
    const response = await fetch(src);

    const map = await response.json();

    System.addImportMap(map);
    return Promise.resolve();
  }

  // Standard script loading for .js files
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = type;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
