import { loadScript } from "../../../utils/loader/loader.script.js";

export const reactCardBattleConfiguration = {
  appName: "Card Battle",
  appKey: "card-battle",
  icon: "cards_stack",
  description:
    "Card Battle Game built with React, Material-UI and React Router, showcasing a simple card battle game with character selection and battle mechanics.",
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
        name: "@mui/icons-material",
        object: "MaterialUIIcons",
        url: "https://unpkg.com/@mui/icons-material@5/umd/material-ui-icons.development.js",
        esm: "https://virtual-mui-icons-material",
        crossorigin: true,
      },
      {
        name: "react-router-dom",
        object: "ReactRouterDOM",
        esm: "https://virtual-react-router-dom",
        url: "https://unpkg.com/react-router-dom@5.3.0/umd/react-router-dom.min.js",
      },
    ];

    // 2. Load the scripts (Your existing loop)
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
      const module = await System.import("./src/react/card/battle/src/App.tsx");
      console.log("Application Loaded:", module);
    } catch (err) {
      console.error("SystemJS Import Error:", err);
    }
  },
};
