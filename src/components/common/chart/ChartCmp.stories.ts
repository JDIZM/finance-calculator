import ChartCmp from './ChartCmp.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Chart/ChartCmp',
  component: ChartCmp,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'centered'
  },
  args: {
    // More on args: https://storybook.js.org/docs/vue/writing-stories/args
    // The args you need here will depend on your component
  }
} satisfies Meta<typeof ChartCmp>

export default meta
type Story = StoryObj<typeof meta>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: (args) => ({
    components: { ChartCmp },
    setup() {
      return { args }
    },
    template: '<chart-cmp v-bind="args" />'
  }),
  args: {
    deposits: [1000, 2000, 3000, 4000],
    projection: [2000, 3000, 4000, 5000]
  }
}
