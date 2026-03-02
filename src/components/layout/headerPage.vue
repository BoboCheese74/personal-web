<template>
  <div class="header">
    <svg class="header-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1558 832">
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
    <div class="menu">
      <button class="btn-home">Home</button>
      <button class="btn-user">User</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, ref, nextTick } from 'vue'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// const initHeaderAnimation = async () => {
//   await nextTick()

//   const logoDom = document.querySelector('.header-logo') as HTMLElement
//   const headerDom = document.querySelector('.header') as HTMLElement

//   ScrollTrigger.create({
//     trigger: '.row1',
//     start: 'bottom top',
//     scrub: 1,
//     markers: true,
//     animation: gsap.from(headerDom, {
//       y: -100,
//       duration: 1,
//       ease: 'power2.out',
//     }),
//   })
// }

// onMounted(() => {
//   initHeaderAnimation()
// })
</script>

<style scoped lang="scss">
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;

  /* 关键：全局混合模式，让内部所有元素颜色反转*/
  mix-blend-mode: difference;

  .header.on-white-bg {
    filter: invert(1); /* 完全反转所有颜色*/
  }

  .header-logo {
    margin-left: 1rem;
    width: 80px;

    .cls-1,
    .cls-2 {
      transition: all 0.3s ease;
      fill: #ffffff; /* 保持白色，混合模式会自动反转 */
      fill-rule: evenodd;
    }

    .cls-1 {
      stroke: #ffffff;
      stroke-width: 1px;
    }
  }

  .menu {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn-home,
    .btn-user {
      position: relative; /* 关键：为伪元素提供定位上下文 */
      font-family: 'Silkscreen';
      background: none;
      border: none;
      color: #ffffff; /* 保持白色文字，混合模式会确保可见性*/
      font-size: 2.0625rem;
      cursor: pointer;
      padding: 0.5rem;
      margin: 0 1rem;
      transition: all 0.3s ease;

      &::before {
        content: '';
        position: absolute; /* 绝对定位 */
        bottom: 0; /* 定位到元素底部*/
        left: 0; /* 从左侧开始*/
        width: 0; /* 初始宽度为 0 */
        height: 2px; /* 下划线厚度*/
        background-color: #ffffff; /* 下划线颜色*/
        transition: width 0.3s ease; /* 平滑动画 */
      }

      &:hover {
        &::before {
          width: 100%; /* 展开下划线*/
        }
      }
    }
  }
}
</style>
