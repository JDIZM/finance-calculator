import { useCompoundInterestStore } from '@/stores/compound'
import CompoundInterestResults from './CompoundInterestResults.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'

type PagePropsAndCustomArgs = ComponentProps<typeof CompoundInterestResults> & {
  investmentType?: 'lumpSum' | 'contribution' | 'debtRepayment'
}

const meta = {
  title: 'Calculator/Compound Interest/Results',
  component: CompoundInterestResults,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'centered'
  },
  args: {
    // More on args: https://storybook.js.org/docs/vue/writing-stories/args
    // The args you need here will depend on your component
    investmentType: 'lumpSum'
  }
  // custom arg types https://storybook.js.org/docs/writing-stories/args#args-can-modify-any-aspect-of-your-component
  // argTypes: {
  //   investmentType: {
  //     control: {
  //       type: 'select',
  //       options: ['lumpSum', 'contribution', 'debtRepayment']
  //     }
  //   }
  // }
} satisfies Meta<PagePropsAndCustomArgs>

export default meta
type Story = StoryObj<PagePropsAndCustomArgs>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const LumpSumpResults: Story = {
  render: (args) => ({
    components: { CompoundInterestResults },
    setup() {
      const compoundStore = useCompoundInterestStore()
      return { args, compoundStore }
    },
    mounted() {
      this.compoundStore.setResults({
        principal: 10000,
        rate: 0.04,
        years: 5,
        currentPositionInYears: 0,
        paymentsPerAnnum: 12,
        totalPayments: 1,
        ratePerPeriod: 0.0033333333333333335,
        multiplierTotal: 1.2166529024000001,
        multiplierPerPeriod: 1.0033333333333334,
        totalInvestment: 10000,
        currentBalance: 10000,
        endBalance: 12166.529024000001,
        accrualOfPaymentsPerAnnum: false,
        interestPerAnnum: [400, 416, 432.64, 449.9456, 467.9436],
        totalInterest: 2166.5292,
        investmentType: 'lumpSum'
      })
    },
    template: '<compound-interest-results v-bind="args" />'
  })
}
