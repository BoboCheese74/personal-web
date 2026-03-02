<template>
  <canvas ref="canvas" class="interactive-bg" />
  <svg class="background-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1558 832">
    <path
      id="形状_1"
      data-name="形状 1"
      class="cls-1"
      d="M1205,257L782,329,1019,56,641,354,0,465,402,705H730L439,641,293,509,783,375l58,44,224-3L885,378l-14-27Z"
    />
    <path id="形状_2" data-name="形状 2" class="cls-1" d="M1544,2L887,285l492-157L1137,528Z" />
    <path id="形状_3" data-name="形状 3" class="cls-1" d="M1016,528h46l-49,148H967Z" />
    <path id="形状_4" data-name="形状 4" class="cls-1" d="M1084,594l-25,24h119l-10-24h-84Z" />
    <path
      id="形状_5"
      data-name="形状 5"
      class="cls-1"
      d="M1402,528H1250l-26,23-20,63,118,1-10,27-12,10H1185l11,24h133l26-22,20-65-118,1,10-26,13-11h97Z"
    />
    <path id="形状_6" data-name="形状 6" class="cls-1" d="M1421,528l-48,148h47l48-148h-47Z" />
    <path
      id="Q"
      class="cls-2"
      d="M900.023,675.149l-5.189-10.659-12.857,10.659H763l52.621-146.3H981.392l-33.6,93.42L931.723,635.44l20.76,39.709h-52.46Zm-20.76-39.709-16.87-33.021h48.053l18.717-52.04H851.524L814.389,653.623h42.387Z"
    />
    <path id="形状_8" data-name="形状 8" class="cls-1" d="M754,695l-5,12h684l6-12H754Z" />
  </svg>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()

const preventDefault = (e: Event) => {
  e.preventDefault()
}

const lockScroll = () => {
  document.body.style.overflow = 'hidden'
  document.addEventListener('wheel', preventDefault, { passive: false })
  document.addEventListener('touchmove', preventDefault, { passive: false })
}

const unlockScroll = () => {
  document.body.style.overflow = ''
  document.removeEventListener('wheel', preventDefault)
  document.removeEventListener('touchmove', preventDefault)
}

onMounted(() => {
  lockScroll()

  loadingStore.startLoading()

  const interval = setInterval(() => {
    if (loadingStore.loadingProgress < 100) {
      loadingStore.loadingProgress += 1
    } else {
      clearInterval(interval)
      setTimeout(() => {
        loadingStore.completeLoading()
        unlockScroll()
      }, 500)
    }
  }, 30)
})

onBeforeUnmount(() => {
  unlockScroll()
})
</script>

<style scoped>
.interactive-bg {
  background-color: #191919;
  width: 100vw; /* 改为 vw 单位 */
  height: 100vh; /* 改为 vh 单位 */
  display: block;
  pointer-events: none;
  position: fixed; /* 改为 fixed */
  left: 0;
  top: 0;
  z-index: -2;
}

.background-logo {
  position: fixed; /* 改为 fixed */
  pointer-events: none;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 50%;
  height: auto;
  opacity: 0.03;
  z-index: -1;

  .cls-1,
  .cls-2 {
    fill: #ffffff;
    fill-rule: evenodd;
  }

  .cls-1 {
    stroke: #ffffff;
    stroke-width: 1px;
  }
}

/* 确保父容器样式*/
:deep(.parent-container) {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
