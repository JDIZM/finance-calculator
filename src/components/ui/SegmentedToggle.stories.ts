import SegmentedToggle from './SegmentedToggle.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

const meta = {
  title: 'UI/SegmentedToggle',
  component: SegmentedToggle,
  parameters: { layout: 'centered' }
} satisfies Meta<typeof SegmentedToggle>

export default meta
type Story = StoryObj<typeof meta>

export const TwoOptions: Story = {
  args: {
    modelValue: 'repayment',
    label: 'Mortgage type',
    options: [
      { value: 'repayment', label: 'Repayment' },
      { value: 'interestOnly', label: 'Interest-only' }
    ]
  },
  render: (args) => ({
    components: { SegmentedToggle },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
      <div class="w-80 bg-white p-8">
        <SegmentedToggle v-bind="args" v-model="value" />
        <p class="mt-3 font-mono text-sm">value: {{ value }}</p>
      </div>
    `
  })
}
