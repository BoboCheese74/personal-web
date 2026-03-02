<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingPage from '@/components/layout/LoadingPage.vue'
import InteractiveBackground from './components/layout/InteractiveBackground.vue'
</script>

<template>
  <!-- sadasd -->
  <LoadingPage />
  <RouterView />
  <InteractiveBackground />
</template>

<style scoped></style>
