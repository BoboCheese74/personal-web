<template>
  <div class="page">
    <svg
      class="background-svg"
      viewBox="0 0 1920 920"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1920 -4.54938e-05V73H1390V54H845V39H345V18.9834H0V-4.54938e-05H1920Z"
        fill="#D9D9D9"
      />
      <path
        d="M1920 160V220H1487.05V205.763H1042.05V190.509H633.229V176.271H351.748V160H1920Z"
        fill="#D9D9D9"
      />
      <path
        d="M1920 310V360H1564.7V348.136H1199.5V335.424H864V323.56H633V310H1920Z"
        fill="#D9D9D9"
      />
      <path
        d="M1920 450V490H1628.47V480.509H1328.82V470.339H1053.54V460.848H864V450H1920Z"
        fill="#D9D9D9"
      />
      <path
        d="M1920 580V610H1680.92V602.882H1435.19V595.254H1209.44V588.136H1054V580H1920Z"
        fill="#D9D9D9"
      />
      <path
        d="M1920 700V720H1723.72V715.254H1521.96V710.17H1336.62V705.424H1209V700H1920Z"
        fill="#D9D9D9"
      />
      <path
        d="M1920 810.002V820.002H1759.05V817.629H1593.62V815.087H1441.64V812.714H1337V810.002H1920Z"
        fill="#D9D9D9"
      />
      <path
        d="M1920 919V920H1788.04V919.763H1652.4V919.509H1527.79V919.271H1442V919H1920Z"
        fill="#D9D9D9"
      />
    </svg>

    <div class="row1">
      <div class="row1-title">
        <div class="title-cnt" ref="row1cnt1dom">
          <p class="title-animate title">Cheese's</p>
          <h2 class="title-animate title2">Personal blog</h2>
        </div>
      </div>
      <!-- <h2 class="title-animate title2" style="font-family: 'PixelFont2'">璧烽</h2> -->
    </div>
    <!-- <div class="row2">
      <div class="row2-cnt1" ref="row2cnt1dom">
        <div class="row2-cnt1-child">

        </div>
      </div>
    </div> -->
    <div class="row2"></div>
    <div class="other"></div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import SplitText from 'gsap/SplitText'
import { ref, onMounted, watch, nextTick } from 'vue'
import { useLoadingStore } from '@/stores/loading'
import Lenis from 'lenis'

const loadingStore = useLoadingStore()

// gsap鎻掍欢娉ㄥ唽
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(SplitText)

// 创建平滑滚动
const lenis = new Lenis({
  duration: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  autoRaf: true,
})

const initTitleAnimation = async () => {
  await nextTick()

  // 鑾峰彇鎵€鏈夐渶瑕佸姩鐢荤殑鍏冪礌
  const titleElements = document.querySelectorAll('.title-animate') as NodeListOf<HTMLElement>

  // 閬嶅巻dom鍏冪礌瀵规瘡涓厓绱犺繘琛屾媶鍒嗗姩鐢?
  titleElements.forEach((element) => {
    SplitText.create(element, {
      autoSplit: true,
      type: 'chars',
      mask: 'chars',
      onSplit(self) {
        gsap.set(self.chars, {
          yPercent: 100,
        })

        return gsap.to(self.chars, {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        })
      },
    })
  })
}

// 定义动画
onMounted(() => {
  // 濡傛灉宸茬粡鍔犺浇瀹屾垚锛岀洿鎺ユ墽琛屽姩鐢?
  if (!loadingStore.isLoading) {
    initTitleAnimation()
  } else {
    // 鍚﹀垯鐩戝惉鍔犺浇鐘舵€侊紝鍔犺浇瀹屾垚鍚庢墽琛屽姩鐢?
    const stopWatcher = watch(
      () => loadingStore.isLoading,
      (isLoading) => {
        if (!isLoading) {
          initTitleAnimation()
          stopWatcher() // 鎵ц涓€娆″悗鍋滄鐩戝惉
        }
      },
      { immediate: true },
    )
  }

  // if (row2cnt1dom.value) {
  //   const row2Width = ref(row2cnt1dom.value.scrollWidth) // 鑾峰彇鍔ㄦ€侀珮搴?  // ScrollTrigger.create({
  //   trigger: '.row2',
  //   start: 'top top',
  //   end: row2Width.value,
  //   pin: true,
  //   pinSpacing: true,
  //   scrub: true,
  //   invalidateOnRefresh: true,
  //   markers: true,
  //   animation: gsap.to('.row2-cnt1', {
  //     scrollTo: { x: 'max', autoKill: false },
  //     ease: 'none',
  //   }),
  // })
  // }
})
</script>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .background-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .row1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100vh;

    .row1-title {
      display: flex;
      height: 100%;
      padding: 100px 0;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;

      .title-cnt {
        display: flex;
        height: 443px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        align-self: stretch;

        .title {
          flex-shrink: 0;
          align-self: stretch;
          color: #fff;

          font-family: Silkscreen;
          font-size: 150px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .title2 {
          flex-shrink: 0;
          align-self: stretch;

          color: #fff;
          font-family: Silkscreen;
          font-size: 150px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }
  }

  // .row2 {
  //   display: flex;
  //   max-width: 100%;
  //   height: 100vh;

  //   .row2-cnt1 {
  //     display: flex;
  //     align-items: center;
  //     max-width: 100%;
  //     height: 100vh;
  //     overflow: hidden;
  //     gap: 20px;

  //     .row2-cnt1-child {
  //       display: flex;
  //       background-color: royalblue;
  //       width: 20rem;
  //       height: 20rem;
  //       flex-shrink: 0;
  //     }
  //   }
  // }

  .row2 {
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    background-color: #848aff;
    align-items: center;

    .row2-cnt {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      width: 100%;
      height: 100%;

      .row2-cnt-child {
        flex-shrink: 0;
      }
    }
  }

  .other {
    height: 100vh;
  }
}
</style>
