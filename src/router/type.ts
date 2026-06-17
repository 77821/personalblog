import type { RouteRecordRaw } from "vue-router";

export interface RouteMeta {
  title: string;
  icon?: string;
  hidden?: boolean;
  keepAlive?: boolean;
}

export type AppRouteRecordRaw = RouteRecordRaw & {
  meta: RouteMeta;
  children?: AppRouteRecordRaw[];
};
