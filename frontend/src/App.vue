
<template>
  <v-layout> 
    <v-main>
      <SidebarNav />
      <RouterView class="ml-2" />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarNav from './components/SidebarNav/SidebarNav.vue'
</script>

<style scoped>
v-main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
}
</style>
