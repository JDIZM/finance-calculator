import type { Meta, StoryObj } from '@storybook/vue3'
import ProjectionChart from './ProjectionChart.vue'

const meta: Meta<typeof ProjectionChart> = {
  title: 'Components/ProjectionChart',
  component: ProjectionChart,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title of the projection chart'
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text below the title'
    },
    currency: {
      control: 'select',
      options: ['GBP', 'USD', 'EUR'],
      description: 'Currency symbol to display'
    },
    chartHeight: {
      control: { type: 'number', min: 200, max: 600, step: 50 },
      description: 'Height of the chart in pixels'
    },
    defaultInitialDeposit: {
      control: { type: 'number', min: 0, max: 100000, step: 1000 },
      description: 'Default initial deposit amount'
    },
    defaultMonthlyContribution: {
      control: { type: 'number', min: 0, max: 10000, step: 100 },
      description: 'Default monthly contribution amount'
    },
    defaultYears: {
      control: { type: 'number', min: 1, max: 50, step: 1 },
      description: 'Default investment period in years'
    },
    defaultInterestRate: {
      control: { type: 'number', min: 0, max: 20, step: 0.5 },
      description: 'Default annual interest rate percentage'
    }
  }
}

export default meta
type Story = StoryObj<typeof ProjectionChart>

export const Default: Story = {
  args: {
    title: 'How much your money could grow',
    subtitle: 'Adjust the sliders below to see your potential returns',
    currency: 'GBP',
    chartHeight: 350,
    defaultInitialDeposit: 5000,
    defaultMonthlyContribution: 500,
    defaultYears: 25,
    defaultInterestRate: 5.0
  }
}

export const ShortTerm: Story = {
  args: {
    title: 'Short-term savings projection',
    subtitle: '5-year investment plan',
    currency: 'GBP',
    chartHeight: 350,
    defaultInitialDeposit: 10000,
    defaultMonthlyContribution: 1000,
    defaultYears: 5,
    defaultInterestRate: 4.5
  }
}

export const LongTerm: Story = {
  args: {
    title: 'Long-term wealth building',
    subtitle: 'Plan for your retirement over 40 years',
    currency: 'GBP',
    chartHeight: 400,
    defaultInitialDeposit: 1000,
    defaultMonthlyContribution: 300,
    defaultYears: 40,
    defaultInterestRate: 7.0
  }
}

export const HighContribution: Story = {
  args: {
    title: 'Aggressive savings strategy',
    subtitle: 'Maximize your returns with higher contributions',
    currency: 'USD',
    chartHeight: 350,
    defaultInitialDeposit: 20000,
    defaultMonthlyContribution: 2000,
    defaultYears: 20,
    defaultInterestRate: 6.5
  }
}

export const Conservative: Story = {
  args: {
    title: 'Conservative investment approach',
    subtitle: 'Lower risk with steady growth',
    currency: 'EUR',
    chartHeight: 350,
    defaultInitialDeposit: 5000,
    defaultMonthlyContribution: 250,
    defaultYears: 15,
    defaultInterestRate: 3.0
  }
}
