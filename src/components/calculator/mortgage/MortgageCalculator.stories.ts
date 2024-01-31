import MortgageCalculator from './MortgageCalculator.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Calculator/MortgageCalculator',
  component: MortgageCalculator,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'centered'
  },
  args: {
    // More on args: https://storybook.js.org/docs/vue/writing-stories/args
    // The args you need here will depend on your component
  }
} satisfies Meta<typeof MortgageCalculator>

export default meta
type Story = StoryObj<typeof meta>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: (args) => ({
    components: { MortgageCalculator },
    setup() {
      return { args }
    },
    template: '<mortgage-calculator v-bind="args" />'
  }),
  args: {
    //
  }
}
