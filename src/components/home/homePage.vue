<template>
  <div class="page">
    <svg
      class="background-svg"
      viewBox="0 0 1920 920"
      preserveAspectRatio="none"
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
      <!-- <h2 class="title-animate title2" style="font-family: 'PixelFont2'">起飏</h2> -->
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
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useLoadingStore } from '@/stores/loading'
import Lenis from 'lenis'

const loadingStore = useLoadingStore()

// gsap 插件注册
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(SplitText)

let lenis: Lenis | null = null

const handleScrollTriggerRefresh = () => {
  lenis?.resize()
}

const ensureLenis = () => {
  if (lenis) return

  lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    autoRaf: true,
  })

  lenis.on('scroll', ScrollTrigger.update)
  ScrollTrigger.addEventListener('refresh', handleScrollTriggerRefresh)
}

let bgScrollTl: gsap.core.Timeline | null = null

type PathCommand =
  | { cmd: 'M'; x: number; y: number }
  | { cmd: 'H'; x: number }
  | { cmd: 'V'; y: number }
  | { cmd: 'Z' }

type BgPathMeta = {
  el: SVGPathElement
  commands: PathCommand[]
  yTop: number
  width: number
  height: number
  sx: number
  growY: number
  growYToBottom: number
  closingVIndex: number
  scaleXToFullWidth: number
}

const parsePathCommands = (d: string): PathCommand[] => {
  const tokens = d.match(/[MHVZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? []
  const commands: PathCommand[] = []
  let i = 0

  while (i < tokens.length) {
    const token = tokens[i++]
    if (token === 'M') {
      const x = Number(tokens[i++])
      const y = Number(tokens[i++])
      commands.push({ cmd: 'M', x, y })
    } else if (token === 'H') {
      const x = Number(tokens[i++])
      commands.push({ cmd: 'H', x })
    } else if (token === 'V') {
      const y = Number(tokens[i++])
      commands.push({ cmd: 'V', y })
    } else if (token === 'Z') {
      commands.push({ cmd: 'Z' })
    }
  }

  return commands
}

const formatPathNumber = (value: number) => {
  if (Math.abs(value) < 1e-4) return '0'
  return Number(value.toFixed(4)).toString()
}

const buildPathD = (meta: BgPathMeta, anchorX: number) => {
  const mapX = (x: number) => anchorX - (anchorX - x) * meta.sx

  return meta.commands
    .map((command, index) => {
      if (command.cmd === 'M') {
        return `M${formatPathNumber(mapX(command.x))} ${formatPathNumber(command.y)}`
      }
      if (command.cmd === 'H') {
        return `H${formatPathNumber(mapX(command.x))}`
      }
      if (command.cmd === 'V') {
        const y = index === meta.closingVIndex ? command.y : command.y + meta.growY
        return `V${formatPathNumber(y)}`
      }
      return 'Z'
    })
    .join('')
}

const renderBgPath = (meta: BgPathMeta, anchorX: number) => {
  meta.el.setAttribute('d', buildPathD(meta, anchorX))
}

const renderBgPaths = (metas: BgPathMeta[], anchorX: number) => {
  metas.forEach((meta) => renderBgPath(meta, anchorX))
}

const createBgPathMetas = () => {
  const svg = document.querySelector('.background-svg') as SVGSVGElement | null
  const paths = document.querySelectorAll('.background-svg path') as NodeListOf<SVGPathElement>
  if (!svg || !paths.length) return null

  const vb = svg.viewBox.baseVal
  const vbWidth = vb.width || 1920
  const vbHeight = vb.height || 920
  // 让 path 长到可视区域底部就结束，避免画面已铺满但时间线还在跑不可见的 overscan
  const yOverscan = 0

  const metas: BgPathMeta[] = Array.from(paths).map((el) => {
    const originalD = el.dataset.originalD || el.getAttribute('d') || ''
    if (!el.dataset.originalD) {
      el.dataset.originalD = originalD
    }

    const commands = parsePathCommands(originalD)
    const box = el.getBBox()
    const width = Math.max(box.width, 1)
    const height = Math.max(box.height, 1)
    const vIndexes = commands.reduce<number[]>((acc, command, index) => {
      if (command.cmd === 'V') acc.push(index)
      return acc
    }, [])
    const closingVIndex = vIndexes.length ? vIndexes[vIndexes.length - 1] : -1
    const maxBottomY = vIndexes.reduce((maxY, index) => {
      if (index === closingVIndex) return maxY
      const command = commands[index] as Extract<PathCommand, { cmd: 'V' }>
      return Math.max(maxY, command.y)
    }, box.y + height)

    return {
      el,
      commands,
      yTop: box.y,
      width,
      height,
      sx: 1,
      growY: 0,
      growYToBottom: Math.max(0, vbHeight + yOverscan - maxBottomY),
      closingVIndex,
      scaleXToFullWidth: Math.max(1, vbWidth / width),
    }
  })

  return { svg, vbWidth, metas }
}

const initBackgroundLINeAnimation = async () => {
  await nextTick()

  const ctx = createBgPathMetas()
  if (!ctx) return

  const { vbWidth, metas } = ctx
  const widths = metas.map((meta) => meta.width)
  const maxWidth = Math.max(...widths, 1)

  metas.forEach((meta) => {
    meta.sx = 0
    meta.growY = 0
  })
  renderBgPaths(metas, vbWidth)

  return new Promise<void>((resolve) => {
    gsap.to(metas, {
      sx: 1,
      duration: (i) => 0.35 + (widths[i] / maxWidth) * 0.5, // 按线宽变长时长（变长感更明显）
      stagger: 0.1, // 依次播放
      ease: 'power2.out',
      onUpdate: () => {
        renderBgPaths(metas, vbWidth)
      },
      onComplete: () => {
        metas.forEach((meta) => {
          meta.sx = 1
          meta.growY = 0
        })
        renderBgPaths(metas, vbWidth)
        resolve()
      },
    })
  })
}

const initBackgroundScrollAnimation = async () => {
  await nextTick()

  const ctx = createBgPathMetas()
  if (!ctx) return

  const { svg, vbWidth, metas } = ctx

  bgScrollTl?.kill()
  gsap.set(svg, { autoAlpha: 1 })
  metas.forEach((meta) => {
    meta.sx = 1
    meta.growY = 0
  })
  renderBgPaths(metas, vbWidth)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.page',
      start: 'top top',
      end: () => `+=${Math.max(window.innerHeight * 2, 1800)}`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      invalidateOnRefresh: true,
      markers: true,
    },
  })

  // 阶段1：依次横向变长（右 -> 左）
  metas.forEach((meta) => {
    tl.to(meta, {
      sx: meta.scaleXToFullWidth,
      duration: 0.05,
      ease: 'none',
      onUpdate: () => renderBgPath(meta, vbWidth),
    })
  })

  // 阶段2：保持原路径台阶造型，所有 path 同时向下延展并以 SVG 铺满状态结束
  tl.to(
    metas,
    {
      growY: (i: number) => metas[i].growYToBottom,
      duration: 0.8,
      ease: 'none',
      onUpdate: () => renderBgPaths(metas, vbWidth),
    },
  )

  bgScrollTl = tl
  ScrollTrigger.refresh()
  lenis?.resize()
}

const initTitleAnimation = async () => {
  await nextTick()

  // 获取所有需要动画的元素
  const titleElements = document.querySelectorAll('.title-animate') as NodeListOf<HTMLElement>

  // 遍历 DOM 元素并为每个元素执行拆分动画
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

const runEntryAnimations = async () => {
  initTitleAnimation()
  await initBackgroundLINeAnimation()
  initBackgroundScrollAnimation()
}

// 定义动画
onMounted(() => {
  ensureLenis()

  // 如果已经加载完成，直接执行动画
  if (!loadingStore.isLoading) {
    runEntryAnimations()
  } else {
    // 否则监听加载状态，加载完成后执行动画
    const stopWatcher = watch(
      () => loadingStore.isLoading,
      (isLoading) => {
        if (!isLoading) {
          runEntryAnimations()
          stopWatcher() // 执行一次后停止监听
        }
      },
      { immediate: true },
    )
  }

  // if (row2cnt1dom.value) {
  //   const row2Width = ref(row2cnt1dom.value.scrollWidth) // 获取动态宽度  // ScrollTrigger.create({
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

onBeforeUnmount(() => {
  bgScrollTl?.kill()
  ScrollTrigger.removeEventListener('refresh', handleScrollTriggerRefresh)
  lenis?.destroy()
  lenis = null
})
</script>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .background-svg {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 1;
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
