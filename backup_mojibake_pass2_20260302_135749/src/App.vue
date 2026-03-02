<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingPage from '@/components/layout/LoadingPage.vue'
import InteractiveBackground from './components/layout/InteractiveBackground.vue'
</script>

<template>
  <LoadingPage />
  <RouterView />
  <InteractiveBackground />
</template>

<style scoped></style>
