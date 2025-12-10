import { createPinia } from 'pinia'
import type { OnCreateAppSync } from 'vike-vue/types'

export const onCreateApp: OnCreateAppSync = (pageContext): ReturnType<OnCreateAppSync> => {
  const { app } = pageContext
  const pinia = createPinia()
  app.use(pinia)
}
