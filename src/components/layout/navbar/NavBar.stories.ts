import NavBar from './NavBar.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Layout/NavBar',
  component: NavBar,
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof NavBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { NavBar },
    template: `
      <div class="min-h-[200px] bg-surface-off-white">
        <NavBar />
      </div>
    `
  })
}
