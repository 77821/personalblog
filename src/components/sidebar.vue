<template>
  <el-menu :default-active="route.path" router class="el-menu-vertical-demo">
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
import { useRoute } from "vue-router";
import { routes } from "@/router";
import type { AppRouteRecordRaw } from "@/router/type";
import { getMenus } from "@/utils/menu";
const route = useRoute();

const menus = getMenus((routes[0]?.children ?? []) as AppRouteRecordRaw[]);
</script>
<style scoped>
.el-menu {
  height: 100%;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  border: none;
}
</style>
