import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vike from 'vike/plugin'

// Check if we're in Storybook mode
const isStorybook = process.argv.includes('--storybook') ||
                    process.env.npm_lifecycle_event?.includes('storybook') ||
                    process.env.STORYBOOK === 'true'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // Only load Vike when not in Storybook
    ...(!isStorybook ? [vike({ prerender: true })] : [])
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
