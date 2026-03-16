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
        // ("https://unpkg.com/vue@latest",
        //   "https://unpkg.com/vue-router@4",
        //   "https://cdn.jsdelivr.net/npm/quasar@2.17.4/dist/quasar.umd.js",
        //   "https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js",
        //   "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
        //   "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js");
        const devtoolsUrl = "https://virtual/vue-devtools-api";
        System.set(devtoolsUrl, {
          setupDevtoolsPlugin: () => {},
        });
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
  ],
};
