import { materialTemplateCDNConfiguration } from "../src/react/template/material-template-cdn/configuration.js";
import { reactMaterialTemplateConfiguration } from "../src/react/template/material/configuration.js";
import { reactTempoConfiguration } from "../src/react/tempo/configuration.js";
import { loadScript } from "../src/utils/loader/loader.script.js";
import { loadTailwind } from "../src/utils/loader/loader.tailwind.js";

export const appConfiguration = {
  apps: [
    {
      appName: "React App Template",
      appKey: "react-app-template",
      icon: "code",
      description:
        "React Template Application with Tailwind, React Router and more",
      async run() {
        console.log("Attempt to run");
        if (!window.tailwind) {
          console.log("Tailwind not found, loading...");
          await loadTailwind();
          console.log("Tailwind loaded successfully.");
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
    {
      appName: "Vue App Template",
      appKey: "vue-app-template",
      icon: "code",
      description:
        "Vue Template Application with Tailwind, Vue Router and more",
      async run() {
        console.log("attempt to load vue script");
        await Promise.all([
          loadScript("https://unpkg.com/vue@3/dist/vue.global.js"),
          loadScript("https://unpkg.com/vue-router@4"),
          loadScript(
            "https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js",
          ),
        ]);
        console.log("Vue script loaded.");
        System.set("https://unpkg.com/vue@3/dist/vue.global.js", {
          default: window.Vue,
          ...window.Vue,
        });

        System.set("https://unpkg.com/vue-router@4", {
          default: window.VueRouter,
          ...window.VueRouter,
        });

        System.set(
          "https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js",
          {
            default: window["vue3-sfc-loader"],
            ...window["vue3-sfc-loader"],
          },
        );

        System.set("https://virtual/vue-devtools-api", {
          setupDevtoolsPlugin: () => {},
        });

        console.log("Mock registered.");
        console.log("Attempt to run Vue App");
        await loadScript(
          "dependencies/vue-projects/vue-local.json",
          "systemjs-importmap",
        );
        System.import("./src/vue/template-v1/template-v1.js").then((module) => {
          console.log("Successfully loaded");
        });
      },
    },
    reactMaterialTemplateConfiguration,
    materialTemplateCDNConfiguration,
    reactTempoConfiguration,
  ],
};
