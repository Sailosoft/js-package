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
    // await loadScript(
    //   "dependencies/react-projects/react-material-latest.json",
    //   "systemjs-importmap",
    // );
    // System.import("./src/react/template/material/App.tsx").then((module) => {
    //   console.log(module);
    // });
    console.log(window.location.href); // full URL
    console.log(window.location.pathname); // path part of the URL

    await loadImportMap(
      "./dependencies/react-projects/react-material-latest.json",
    );
    await loadScript("./src/react/template/material/App.tsx", "text/babel");
    // await loadScript("https://unpkg.com/@babel/standalone/babel.min.js");
    // await loadTSX("./src/react/template/material/App.tsx");
  },
};
