import Pill from './Pill.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/Pill',
  component: Pill,
  parameters: { layout: 'centered' },
  argTypes: {
    tone: { control: 'select', options: ['light', 'emerald', 'indigo', 'cream', 'ink'] }
  }
} satisfies Meta<typeof Pill>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: { tone: 'light' },
  render: (args) => ({
    components: { Pill },
    setup: () => ({ args }),
    template: `
      <div class="bg-emerald-950 p-8 text-surface-off-white">
        <Pill v-bind="args">Free · No signup</Pill>
      </div>
    `
  })
}

export const Cream: Story = { ...Light, args: { tone: 'cream' } }
export const Emerald: Story = { ...Light, args: { tone: 'emerald' } }
export const Indigo: Story = { ...Light, args: { tone: 'indigo' } }
export const Ink: Story = { ...Light, args: { tone: 'ink' } }
