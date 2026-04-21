import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vike from 'vike/plugin'

const isStorybook =
  process.argv.includes('--storybook') ||
  process.env.npm_lifecycle_event?.includes('storybook') ||
  process.env.STORYBOOK === 'true'

export default defineConfig({
  plugins: [vue(), vueJsx(), ...(!isStorybook ? [vike()] : [])],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    watch: {
      ignored: [
        '**/coverage/**',
        '**/storybook-static/**',
        '**/dist/**',
        '**/.vike/**',
        '**/cypress/videos/**',
        '**/cypress/screenshots/**',
      ],
    },
  },
})
