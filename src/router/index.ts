import { createRouter, createWebHistory } from "vue-router";

import vastRoutes from "./modules/vast";

const Layout = () => import("@/layout/index.vue");

export const routes = [
  {
    path: "/",
    component: Layout,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/",
    component: Layout,
    children: [vastRoutes],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
