import CalculatorCard from './CalculatorCard.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Marketing/CalculatorCard',
  component: CalculatorCard,
  parameters: { layout: 'centered' },
  argTypes: {
    tone: { control: 'select', options: ['emerald-950', 'ink-950', 'accent-indigo', 'cream'] },
    comingSoon: { control: 'boolean' }
  },
  render: (args) => ({
    components: { CalculatorCard },
    setup: () => ({ args }),
    template: `<div style="width: 340px;"><CalculatorCard v-bind="args" /></div>`
  })
} satisfies Meta<typeof CalculatorCard>

export default meta
type Story = StoryObj<typeof meta>

export const Emerald: Story = {
  args: {
    href: '/compound-interest',
    tone: 'emerald-950',
    eyebrow: 'Grow',
    title: 'Compound interest',
    body: 'See what regular contributions turn into over decades.'
  }
}

export const Ink: Story = {
  args: {
    href: '/mortgage',
    tone: 'ink-950',
    eyebrow: 'Borrow',
    title: 'Mortgage',
    body: 'Monthly repayment and total interest for repayment or interest-only mortgages.'
  }
}

export const Indigo: Story = {
  args: {
    href: '/savings-goal',
    tone: 'accent-indigo',
    eyebrow: 'Target',
    title: 'Savings goal',
    body: 'How much a month to hit your number by a date. Or how long at £X a month.'
  }
}

export const Cream: Story = {
  args: {
    href: '#more',
    tone: 'cream',
    eyebrow: 'Suggest',
    title: 'Something missing?',
    body: 'These calculators are open source. File an issue or PR.',
    external: 'https://github.com/JDIZM/compound-interest'
  }
}

export const ComingSoon: Story = {
  args: {
    href: '/pension',
    tone: 'emerald-950',
    eyebrow: 'Planning',
    title: 'Pension projection',
    body: 'Contributions, employer match, tax relief, growth.',
    comingSoon: true
  }
}
