import type { Config } from 'vike/types'
import vikeVue from 'vike-vue/config'

// Default config (can be overridden by pages)
export default {
  extends: vikeVue,

  // Enable client-side routing
  clientRouting: true,

  // SSG - prerender all pages
  prerender: true
} satisfies Config
