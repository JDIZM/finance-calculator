import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RangeSlider from './RangeSlider.vue'

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
  argTypes: {
    currency: {
      control: 'select',
      options: ['GBP', 'USD', 'EUR'],
      description: 'Currency symbol to display'
    }
  }
}

export default meta
type Story = StoryObj<typeof RangeSlider>

export const Default: Story = {
  render: (args) => ({
    components: { RangeSlider },
    setup() {
      const initialDeposit = ref(5000)
      const monthlyContribution = ref(500)
      const years = ref(25)
      const interestRate = ref(5.0)
      return { args, initialDeposit, monthlyContribution, years, interestRate }
    },
    template: `
      <div style="max-width: 600px; padding: 2rem;">
        <RangeSlider
          v-bind="args"
          v-model:initial-deposit="initialDeposit"
          v-model:monthly-contribution="monthlyContribution"
          v-model:years="years"
          v-model:interest-rate="interestRate"
        />
        <div style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
          <h4>Current Values:</h4>
          <p>Initial Deposit: {{ initialDeposit }}</p>
          <p>Monthly Contribution: {{ monthlyContribution }}</p>
          <p>Years: {{ years }}</p>
          <p>Interest Rate: {{ interestRate }}%</p>
        </div>
      </div>
    `
  }),
  args: {
    currency: 'GBP'
  }
}

export const USDCurrency: Story = {
  render: (args) => ({
    components: { RangeSlider },
    setup() {
      const initialDeposit = ref(10000)
      const monthlyContribution = ref(1000)
      const years = ref(20)
      const interestRate = ref(6.5)
      return { args, initialDeposit, monthlyContribution, years, interestRate }
    },
    template: `
      <div style="max-width: 600px; padding: 2rem;">
        <RangeSlider
          v-bind="args"
          v-model:initial-deposit="initialDeposit"
          v-model:monthly-contribution="monthlyContribution"
          v-model:years="years"
          v-model:interest-rate="interestRate"
        />
      </div>
    `
  }),
  args: {
    currency: 'USD'
  }
}

export const CustomRanges: Story = {
  render: (args) => ({
    components: { RangeSlider },
    setup() {
      const initialDeposit = ref(25000)
      const monthlyContribution = ref(2500)
      const years = ref(15)
      const interestRate = ref(8.0)
      return { args, initialDeposit, monthlyContribution, years, interestRate }
    },
    template: `
      <div style="max-width: 600px; padding: 2rem;">
        <RangeSlider
          v-bind="args"
          v-model:initial-deposit="initialDeposit"
          v-model:monthly-contribution="monthlyContribution"
          v-model:years="years"
          v-model:interest-rate="interestRate"
        />
      </div>
    `
  }),
  args: {
    currency: 'EUR',
    initialDepositMin: 10000,
    initialDepositMax: 100000,
    monthlyMin: 500,
    monthlyMax: 10000,
    yearsMin: 5,
    yearsMax: 30,
    interestMin: 2,
    interestMax: 12
  }
}
