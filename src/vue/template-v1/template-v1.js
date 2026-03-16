import * as Vue from "vue";
import * as VueRouter from "vue-router";
import { loadModule } from "vue3-sfc-loader";

// 1. Configuration for the SFC loader
const options = {
  moduleCache: { vue: Vue },
  async getFile(url) {
    const res = await fetch(url);
    if (!res.ok)
      throw Object.assign(new Error(res.statusText + " " + url), { res });
    return {
      getContentData: (asBinary) => (asBinary ? res.arrayBuffer() : res.text()),
    };
  },
  addStyle(textContent) {
    const style = Object.assign(document.createElement("style"), {
      textContent,
    });
    document.head.append(style);
  },
};

// 2. Define Routes
// We use loadModule to grab the .vue files dynamically
const routes = [
  {
    path: "/",
    component: () =>
      loadModule("./src/vue/template-v1/views/HomeComponent.vue", options),
  },
  {
    path: "/about",
    component: () =>
      loadModule("./src/vue/template-v1/views/WelcomeComponent.vue", options),
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

// 3. Create and Mount App
const app = Vue.createApp({
  template: `
    <nav>
      <router-link to="/">Home</router-link> | 
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>
  `,
});

app.use(router);
app.mount("#app");
