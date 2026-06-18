import type { AppRouteRecordRaw } from "../router/type";

export interface MenuItem {
  title: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
}

function resolveMenuPath(basePath: string, path: string): string {
  if (path.startsWith("/")) return path;
  if (!path) return basePath || "/";
  return `${basePath}/${path}`.replace(/\/+/g, "/");
}

export function getMenus(
  routes: AppRouteRecordRaw[],
  basePath = "",
): MenuItem[] {
  return routes
    .filter((route) => !route.meta?.hidden)
    .map((route) => {
      const fullPath = resolveMenuPath(basePath, route.path);
      return {
        title: route.meta.title,
        icon: route.meta?.icon,
        path: fullPath,
        children: route.children?.length
          ? getMenus(route.children, fullPath)
          : [],
      };
    });
}
