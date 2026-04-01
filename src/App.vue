<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuIndex from './components/menu/menuIndex.vue'
</script>

<template>
  <header>
    <MenuIndex />
  </header>

  <RouterView />
</template>

<style scoped></style>
