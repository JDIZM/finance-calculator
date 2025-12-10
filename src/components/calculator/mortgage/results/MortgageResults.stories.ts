import { useMortgageStore } from '@/stores/mortgage'
import MortgageResults from './MortgageResults.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'

type PagePropsAndCustomArgs = ComponentProps<typeof MortgageResults> & { isRepayment?: boolean }

const meta = {
  title: 'Calculator/MortgageCalculator/Results',
  component: MortgageResults,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'centered'
  },
  args: {
    // More on args: https://storybook.js.org/docs/vue/writing-stories/args
    // The args you need here will depend on your component
    isRepayment: true
  },
  // custom arg types https://storybook.js.org/docs/writing-stories/args#args-can-modify-any-aspect-of-your-component
  argTypes: {
    isRepayment: {
      control: {
        type: 'boolean'
      }
    }
  }
} satisfies Meta<PagePropsAndCustomArgs>

export default meta
type Story = StoryObj<PagePropsAndCustomArgs>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const RepaymentResults: Story = {
  render: (args) => ({
    components: { MortgageResults },
    setup() {
      const mortgageStore = useMortgageStore()
      return { args, mortgageStore }
    },
    mounted() {
      if (args.isRepayment) {
        const repaymentResults = {
          homeValue: 150000,
          deposit: 15000,
          years: 25,
          interestRate: 4,
          monthlyRepayment: 712.58,
          principal: 135000
        }
        this.mortgageStore.setMortgageType('repayment')
        this.mortgageStore.setResults(repaymentResults)
      } else {
        const interestOnlyResults = {
          interestPayments: { yearly: 5400, monthly: 450, period: 450 },
          homeValue: 150000,
          deposit: 15000,
          principal: 135000,
          years: 25,
          interestRate: 4
        }
        this.mortgageStore.setMortgageType('interestOnly')
        this.mortgageStore.setResults(interestOnlyResults)
      }
    },
    template: '<mortgage-results v-bind="args" />'
  })
}

export const InterestOnlyResults: Story = {
  ...RepaymentResults,
  args: {
    isRepayment: false
  }
}
