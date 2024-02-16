import '../src/sass/main.scss'
import { type Preview, setup } from '@storybook/vue3'
import { type App } from 'vue'
import { useMortgageStore } from '../src/stores/mortgage'
import { createPinia } from 'pinia'

const pinia = createPinia()
export let mortgageStore: any

setup((app: App) => {
  app.use(pinia)
  // declaring store here
  // fixes an issue with the store not being available
  mortgageStore = useMortgageStore()
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
