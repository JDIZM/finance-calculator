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

export const Primary: Story = {
  args: { variant: 'primary', size: 'md' },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">Calculate</Button>`,
  }),
}

export const Secondary: Story = { ...Primary, args: { variant: 'secondary' } }
export const Ghost: Story = { ...Primary, args: { variant: 'ghost' } }
export const Large: Story = { ...Primary, args: { variant: 'primary', size: 'lg' } }
