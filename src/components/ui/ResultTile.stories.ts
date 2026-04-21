import ResultTile from './ResultTile.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/ResultTile',
  component: ResultTile,
  parameters: { layout: 'centered' }
} satisfies Meta<typeof ResultTile>

export default meta
type Story = StoryObj<typeof meta>

const creamWrapper = (inner: string) =>
  `<div class="bg-white border border-surface-rule rounded-slab p-6 text-ink-900" style="min-width: 240px;">${inner}</div>`

const darkWrapper = (inner: string) =>
  `<div class="bg-emerald-950 rounded-slab p-6 text-surface-off-white" style="min-width: 240px;">${inner}</div>`

export const OnCream: Story = {
  args: { label: 'Final balance', value: 124_567, prefix: '£', hint: 'After 10 years at 7%' },
  render: (args) => ({
    components: { ResultTile },
    setup: () => ({ args }),
    template: creamWrapper(`<ResultTile v-bind="args" />`)
  })
}

export const OnDark: Story = {
  ...OnCream,
  render: (args) => ({
    components: { ResultTile },
    setup: () => ({ args }),
    template: darkWrapper(`<ResultTile v-bind="args" />`)
  })
}

export const PenceDecimals: Story = {
  args: { label: 'Monthly payment', value: 1578.39, prefix: '£', decimals: 2 },
  render: (args) => ({
    components: { ResultTile },
    setup: () => ({ args }),
    template: creamWrapper(`<ResultTile v-bind="args" />`)
  })
}

export const AbbreviatesToK: Story = {
  args: { label: 'Interest earned', value: 234_567, prefix: '£' },
  render: (args) => ({
    components: { ResultTile },
    setup: () => ({ args }),
    template: creamWrapper(`<ResultTile v-bind="args" />`)
  })
}

export const AbbreviatesToM: Story = {
  args: { label: 'FIRE number', value: 1_000_000, prefix: '£' },
  render: (args) => ({
    components: { ResultTile },
    setup: () => ({ args }),
    template: darkWrapper(`<ResultTile v-bind="args" />`)
  })
}

export const LargeM: Story = {
  args: { label: 'Total pot', value: 12_345_678, prefix: '£' },
  render: (args) => ({
    components: { ResultTile },
    setup: () => ({ args }),
    template: darkWrapper(`<ResultTile v-bind="args" />`)
  })
}

export const NonNumericString: Story = {
  args: { label: 'Years to FIRE', value: '—', decimals: 1 },
  render: (args) => ({
    components: { ResultTile },
    setup: () => ({ args }),
    template: creamWrapper(`<ResultTile v-bind="args" />`)
  })
}
