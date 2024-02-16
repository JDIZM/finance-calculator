import '../src/sass/main.scss'
import { type Preview, setup } from '@storybook/vue3'
import { type App } from 'vue'
import { useMortgageStore } from '../src/stores/mortgage'
import { useCompoundInterestStore } from '@/stores/compound'
import { createPinia } from 'pinia'

const pinia = createPinia()
export let mortgageStore: any
export let compoundStore: any

setup((app: App) => {
  app.use(pinia)
  // declaring store here
  // fixes an issue with the store not being available
  mortgageStore = useMortgageStore()
  compoundStore = useCompoundInterestStore()
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
