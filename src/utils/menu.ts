import type { AppRouteRecordRaw } from "../router/type";

export interface MenuItem {
  title: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
}

export function getMenus(routes: AppRouteRecordRaw[]): MenuItem[] {
  return routes
    .filter((route) => !route.meta?.hidden)
    .map((route) => ({
      title: route.meta.title,
      icon: route.meta?.icon,
      path: route.path,
      children: route.children ? getMenus(route.children) : [],
    }));
}
