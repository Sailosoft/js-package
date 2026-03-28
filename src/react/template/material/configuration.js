import {
  loadImportMap,
  loadScript,
  loadTSX,
} from "../../../utils/loader/loader.script.js";

export const reactMaterialTemplateConfiguration = {
  appName: "React Material Template",
  appKey: "react-material-template",
  icon: "code",
  description:
    "React Material Template Application with Tailwind, React Router and more",
  async run() {
    await loadScript(
      "dependencies/react-projects/react-material-latest.json",
      "systemjs-importmap",
    );
    // System.import("./src/react/template/material/App.tsx").then((module) => {
    //   console.log(module);
    // });
    // 1. Fetch the ESM module from esm.sh

    // 2. Register it into SystemJS manually
    System.register("react", [], function (_export) {
      return {
        execute: async function () {
          const mod = await import("https://esm.sh/react@latest");

          // Fix: Don't spread 'mod' directly. Use a plain object.
          const exportsObj = {};
          for (const key in mod) {
            exportsObj[key] = mod[key];
          }
          exportsObj.default = mod.default || mod;

          _export(exportsObj);
        },
      };
    });
    console.log(window.location.href); // full URL
    console.log(window.location.pathname); // path part of the URL

    System.import("./src/react/template/material/App.tsx").then((module) => {
      console.log(module);
    });
    // await loadImportMap(
    //   "./dependencies/react-projects/react-material-latest.json",
    // );
    // await loadScript("./src/react/template/material/App.tsx", "text/babel");
    // await loadScript("https://unpkg.com/@babel/standalone/babel.min.js");
    // await loadTSX("./src/react/template/material/App.tsx");
  },
};
