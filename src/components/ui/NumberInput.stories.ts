import NumberInput from './NumberInput.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

const meta = {
  title: 'UI/NumberInput',
  component: NumberInput,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Currency: Story = {
  args: { label: 'Starting balance', prefix: '£', hint: 'Starting amount to invest' },
  render: (args) => ({
    components: { NumberInput },
    setup() {
      const value = ref(5000)
      return { args, value }
    },
    template: `
      <div class="bg-surface-off-white p-8" style="width: 340px;">
        <NumberInput v-bind="args" v-model="value" />
      </div>
    `,
  }),
}

export const Percentage: Story = {
  ...Currency,
  args: { label: 'Annual rate', prefix: '%', hint: 'Expected annual return' },
}
