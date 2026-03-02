<template>
  <div class="loading-container" :class="{ 'fade-out': isLoaded }">
    <svg class="loading-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1558 832">
      <path
        v-for="(path, index) in paths"
        :key="index"
        :id="path.id"
        :class="['animate-path', { filled: progress >= ((index + 1) / paths.length) * 100 }]"
        :d="path.d"
      />
    </svg>
    <div class="loading-progress">{{ Math.floor(progress) }}%</div>
  </div>
  <div class="main-content" :class="{ 'slide-in': isLoaded }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const progress = ref(0)
const isLoaded = ref(false)

// 禁用滚动的函数
const preventDefault = (e: Event) => {
  e.preventDefault()
}

// 添加和移除滚动锁定
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
  // 初始化时锁定滚动
  lockScroll()

  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 1
    } else {
      clearInterval(interval)
      setTimeout(() => {
        isLoaded.value = true
        // 加载完成后解锁滚动
        unlockScroll()
      }, 500)
    }
  }, 30)
})

onBeforeUnmount(() => {
  // 组件卸载时确保解锁滚动
  unlockScroll()
})

// 直接在组件中定义路径数据
const paths = [
  {
    id: '形状_1',
    d: 'M1205,257L782,329,1019,56,641,354,0,465,402,705H730L439,641,293,509,783,375l58,44,224-3L885,378l-14-27Z',
  },
  {
    id: '形状_2',
    d: 'M1544,2L887,285l492-157L1137,528Z',
  },
  {
    id: '形状_6',
    d: 'M1402,528H1250l-26,23-20,63,118,1-10,27-12,10H1185l11,24h133l26-22,20-65-118,1,10-26,13-11h97Z',
  },
  {
    id: '形状_3',
    d: 'M900.023,675.149l-5.189-10.659-12.857,10.659H763l52.621-146.3H981.392l-33.6,93.42L931.723,635.44l20.76,39.709h-52.46Zm-20.76-39.709-16.87-33.021h48.053l18.717-52.04H851.524L814.389,653.623h42.387Z',
  },
  {
    id: '形状_7',
    d: 'M1421,528l-48,148h47l48-148h-47Z',
  },
  {
    id: '形状_4',
    d: 'M1016,528h46l-49,148H967Z',
  },
  {
    id: '形状_5',
    d: 'M1084,594l-25,24h119l-10-24h-84Z',
  },

  {
    id: '形状_8',
    d: 'M754,695l-5,12h684l6-12H754Z',
  },
]
</script>

<style scoped lang="scss">
body {
  overflow: hidden; // 防止水平滚动条出现
}

.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #191919;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.5s ease;
  overflow: hidden; // 添加这行

  &.fade-out {
    opacity: 0;
    pointer-events: none;
  }
}

.loading-logo {
  width: 50%;
  max-width: 600px;
  height: auto;
}

.animate-path {
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: draw 2s ease forwards;

  &.filled {
    fill: #ffffff;
    stroke: none;
    animation: fillIn 0.5s ease forwards;
  }
}

.loading-progress {
  margin-top: 20px;
  font-family: 'Silkscreen';
  color: #ffffff;
  font-size: 24px;
}

.main-content {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: translateX(100%);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-x: hidden;

  &.slide-in {
    transform: translateX(0);
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fillIn {
  from {
    fill-opacity: 0;
  }
  to {
    fill-opacity: 1;
  }
}
</style>
