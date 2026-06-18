import type { AppRouteRecordRaw } from "../type";

const vastRoutes: AppRouteRecordRaw = {
  path: "vast",
  name: "vastTools",
  meta: {
    title: "Vast工具",
  },
  children: [
    {
      path: "downpdf",
      name: "downPdf",
      component: () => import("@/views/vastTools/downPdf/downPdf.vue"),
      meta: {
        title: "下载票据PDF",
      },
    },
  ],
};

export default vastRoutes;
