import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { setRem } from "./utils/rem";
setRem();

createApp(App).use(router).use(ElementPlus).mount("#app");
