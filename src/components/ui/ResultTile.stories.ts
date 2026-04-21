import ResultTile from './ResultTile.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/ResultTile',
  component: ResultTile,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ResultTile>

export default meta
type Story = StoryObj<typeof meta>

export const Projection: Story = {
  args: {
    label: 'Projected balance',
    value: 124_567,
    prefix: '£',
    hint: 'After 10 years at 7%',
  },
  render: (args) => ({
    components: { ResultTile },
    setup: () => ({ args }),
    template: `
      <div class="bg-emerald-950 p-10 text-surface-off-white" style="min-width: 340px;">
        <ResultTile v-bind="args" />
      </div>
    `,
  }),
}

export const CreamSurface: Story = {
  ...Projection,
  args: { label: 'Monthly contribution', value: 610.2, prefix: '£', hint: 'To reach £100k in 10 years', decimals: 2 },
  render: (args) => ({
    components: { ResultTile },
    setup: () => ({ args }),
    template: `
      <div class="bg-surface-cream p-10 text-ink-900" style="min-width: 340px;">
        <ResultTile v-bind="args" />
      </div>
    `,
  }),
}
