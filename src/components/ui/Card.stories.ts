import Card from './Card.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: { layout: 'centered' },
  argTypes: {
    tone: {
      control: 'select',
      options: ['cream', 'subtle', 'emerald-950', 'ink-950', 'accent-indigo']
    }
  }
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const innerTemplate = `
  <Card v-bind="args" style="width: 340px;">
    <p class="font-display text-xs font-bold uppercase tracking-widest opacity-70">Compound interest</p>
    <p class="mt-6 font-display text-4xl font-black leading-none tabular-nums">£12,450</p>
    <p class="mt-2 text-sm opacity-80">Projected at 7% over 10 years</p>
  </Card>
`

export const Cream: Story = {
  args: { tone: 'cream' },
  render: (args) => ({ components: { Card }, setup: () => ({ args }), template: innerTemplate })
}

export const Subtle: Story = { ...Cream, args: { tone: 'subtle' } }
export const Emerald: Story = { ...Cream, args: { tone: 'emerald-950' } }
export const Ink: Story = { ...Cream, args: { tone: 'ink-950' } }
export const Indigo: Story = { ...Cream, args: { tone: 'accent-indigo' } }
