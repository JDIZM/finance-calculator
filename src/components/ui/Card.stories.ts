import Card from './Card.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: { layout: 'centered' },
  argTypes: {
    tone: { control: 'select', options: ['emerald-950', 'ink-950', 'accent-indigo', 'cream'] },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Emerald: Story = {
  args: { tone: 'emerald-950' },
  render: (args) => ({
    components: { Card },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args" style="width: 340px;">
        <p class="font-display text-xs font-bold uppercase tracking-widest">Compound interest</p>
        <p class="mt-6 font-display text-5xl font-black leading-none tabular-nums md:text-6xl">£12,450</p>
        <p class="mt-2 text-sm opacity-80">Projected at 7% over 10 years</p>
      </Card>
    `,
  }),
}

export const Ink: Story = { ...Emerald, args: { tone: 'ink-950' } }
export const Indigo: Story = { ...Emerald, args: { tone: 'accent-indigo' } }
export const Cream: Story = { ...Emerald, args: { tone: 'cream' } }
