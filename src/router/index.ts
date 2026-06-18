import { createRouter, createWebHistory } from "vue-router";

import vastRoutes from "./modules/vast";

const Layout = () => import("@/layout/index.vue");

export const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/homePage/index.vue"),
        meta: {
          title: "首页",
        },
      },
      vastRoutes,
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
