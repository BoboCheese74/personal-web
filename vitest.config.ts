import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'
import path from 'path'

const pathSrc = path.resolve(__dirname, 'src')

export default mergeConfig(
  viteConfig,
  defineConfig({
    base: './',
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
    resolve: {
      alias: {
        '@': pathSrc,
      },
    },
  }),
)
