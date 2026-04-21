import SectionLabel from './SectionLabel.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/SectionLabel',
  component: SectionLabel,
  parameters: { layout: 'centered' },
  argTypes: {
    tag: { control: 'select', options: ['h2', 'h3', 'h4', 'p'] },
    size: { control: 'select', options: ['sm', 'lg'] }
  }
} satisfies Meta<typeof SectionLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { tag: 'h3', size: 'sm' },
  render: (args) => ({
    components: { SectionLabel },
    setup: () => ({ args }),
    template: `
      <div class="bg-white p-8">
        <SectionLabel v-bind="args">Your inputs</SectionLabel>
      </div>
    `
  })
}

export const Large: Story = { ...Default, args: { tag: 'h2', size: 'lg' } }
