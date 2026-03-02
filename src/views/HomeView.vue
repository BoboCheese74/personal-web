<script setup lang="ts">
import { RouterView } from 'vue-router'
import headerpage from '@/components/layout/headerPage.vue'
</script>

<template>
  <div class="main">
    <headerpage class="fixed-header" />
    <RouterView />
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .fixed-header {
    position: fixed;
    top: 0;
    z-index: 100;
  }
}
</style>
