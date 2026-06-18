<template>
  <div class="layout">
    <div class="layout-content">
      <div class="layout-content-left">
        <Sidebar />
      </div>
      <div class="layout-content-right">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from "@/components/sidebar.vue";
</script>
<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.layout-content {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.layout-content-left {
  width: 240px;
}
.layout-content-right {
  flex: 1;
  overflow-y: auto;
}
</style>
