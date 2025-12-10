import '../src/sass/main.scss'
import { type Preview, setup } from '@storybook/vue3'
import { createPinia } from 'pinia'

// Create and configure Pinia instance for Storybook
const pinia = createPinia()

setup((app) => {
  app.use(pinia)
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview
