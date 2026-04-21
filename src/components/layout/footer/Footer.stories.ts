import Footer from './Footer.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Footer },
    template: `
      <div class="min-h-[200px] bg-surface-off-white">
        <Footer />
      </div>
    `,
  }),
}
