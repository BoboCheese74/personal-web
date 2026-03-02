<script setup lang="ts">
import { RouterView } from 'vue-router'
import headerpage from '@/components/layout/headerPage.vue'
</script>

<template>
  <div class="main">
    <headerpage class="sticky-header" />
    <RouterView />
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 100;
  }
}
</style>
