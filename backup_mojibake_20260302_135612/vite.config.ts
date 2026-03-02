import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import postcssPxToRem from 'postcss-pxtorem'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  css: {
    postcss: {
      plugins: [
        postcssPxToRem({
          rootValue: 16, // 根字体大小
          propList: ['*'], // 转换所有属性
          selectorBlackList: [], // 不转换的选择器
          minPixelValue: 2, // 最小转换像素值
          exclude: /node_modules/, // 排除 node_modules
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 7474,
  },
})
