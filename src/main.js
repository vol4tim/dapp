import { Buffer } from "buffer";
import { robonomicsUI } from "robonomics-ui-vue";
import { createApp } from "vue";
import App from "./App.vue";
import robonomics from "./robonomics";
import router from "./router";
import store from "./store";
import filters from "./utils/filters";

import "robonomics-ui-vue/style.css";

window.Buffer = Buffer;

const app = createApp(App);

app
  .use(router)
  .use(store)
  .use(filters)
  .use(robonomics)
  .use(robonomicsUI, { store })
  .mount("#app");
