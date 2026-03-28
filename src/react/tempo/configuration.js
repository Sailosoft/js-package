import { loadScript } from "../../utils/loader/loader.script.js";

export const reactTempoConfiguration = {
  appName: "Tempo Project",
  appKey: "react-tempo",
  icon: "code",
  description: "Tempo Project",
  async run() {
    const scripts = [
      {
        name: "react",
        object: "React",
        url: "https://unpkg.com/react@18/umd/react.development.js",
        esm: "https://virtual-react",
        crossorigin: true,
      },
      {
        name: "react-dom/client",
        object: "ReactDOM",
        url: "https://unpkg.com/react-dom@18/umd/react-dom.development.js",
        esm: "https://virtual-react-dom",
        crossorigin: true,
      },
      {
        name: "@mui/material",
        object: "MaterialUI",
        url: "https://unpkg.com/@mui/material@5/umd/material-ui.development.js",
        esm: "https://virtual-mui-material",
        crossorigin: true,
      },
      {
        name: "react-router-dom",
        object: "ReactRouterDOM",
        esm: "https://virtual-react-router-dom",
        url: "https://unpkg.com/react-router-dom@5.3.0/umd/react-router-dom.min.js",
      },
    ];

    await Promise.all([
      loadScript(
        "https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js",
      ),
    ]);
    console.log(window);
    await Promise.all(
      scripts.map((script) =>
        loadScript(script.url, undefined, {
          crossorigin: script.crossorigin,
        }),
      ),
    );

    await loadScript(
      "dependencies/react-projects/react-material-virtual.json",
      "systemjs-importmap",
    );

    for (const script of scripts) {
      const obj = globalThis[script.object];
      System.set(script.esm, {
        default: obj,
        ...obj,
      });
    }

    try {
      const module = await System.import("./src/react/tempo/src/App.tsx");
      console.log("Application Loaded:", module);
    } catch (err) {
      console.error("SystemJS Import Error:", err);
    }
  },
};
