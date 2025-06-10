import { createApp } from "vue";
import App from "./app.vue";
import router from "./router";
import { createPinia } from "pinia";
import pluginPinia from "./lib/plugin-pinia";
import { createVfm } from "vue-final-modal";
import tooltipDirective from "@tune/components/ui/tooltip.js";

const pinia = createPinia();

const app = createApp(App);

const vfm = createVfm();

if (import.meta.env.VITE_SELFHOSTED && import.meta.env.VITE_SELFHOSTED === "false") {
  import("./lib/crisp.js").then(({ loadCrisp }) => loadCrisp());
}

app.use(vfm);

app.use(pinia);

app.use(pluginPinia);

app.use(router);

app.directive("tooltip", tooltipDirective);

app.mount("#app");

if (!navigator.onLine) {
  router.push("/offline"); // Redirect to offline page if not online
}
