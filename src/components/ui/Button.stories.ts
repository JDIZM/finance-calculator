import Button from './Button.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

const lightBg = (template: string) => `<div class="bg-surface-off-white p-8">${template}</div>`
const darkBg = (template: string) => `<div class="bg-emerald-950 p-8 text-surface-off-white">${template}</div>`

export const Primary: Story = {
  args: { variant: 'primary', size: 'md' },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: lightBg(`<Button v-bind="args">Calculate</Button>`),
  }),
}

export const Secondary: Story = { ...Primary, args: { variant: 'secondary' } }

export const GhostOnDark: Story = {
  args: { variant: 'ghost', size: 'md' },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: darkBg(`<Button v-bind="args">Mortgage</Button>`),
  }),
}

export const Small: Story = { ...Primary, args: { variant: 'primary', size: 'sm' } }
export const Large: Story = { ...Primary, args: { variant: 'primary', size: 'lg' } }

export const AllSizes: Story = {
  render: () => ({
    components: { Button },
    template: lightBg(`
      <div class="flex items-center gap-3">
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="md">Medium</Button>
        <Button variant="primary" size="lg">Large</Button>
      </div>
    `),
  }),
}
