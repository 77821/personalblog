<template>
  <el-menu
    default-active="route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="menu in menus" :key="menu.path">
      <el-sub-menu v-if="menu.children?.length" :index="menu.path">
        <template #title>
          <!-- <el-icon><menu /></el-icon> -->
          <span>{{ menu.title }}</span>
        </template>
        <template v-for="child in menu.children" :key="child.path">
          <el-menu-item :index="child.path">{{ child.title }}</el-menu-item>
        </template>
      </el-sub-menu>
      <el-menu-item v-else :index="menu.path">
        <!-- <el-icon><document /></el-icon> -->
        <span>{{ menu.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router";
import type { AppRouteRecordRaw } from "@/router/type";
import { getMenus } from "@/utils/menu";
const router = useRouter();
const route = useRoute();
console.log(router, route);

const menus = getMenus(routes as AppRouteRecordRaw[]);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
<style scoped></style>
