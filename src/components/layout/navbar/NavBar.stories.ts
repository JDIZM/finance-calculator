import NavBar from './NavBar.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import { vueRouter } from 'storybook-vue3-router'

const Home = { template: '<div>Home</div>' }

const customRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home // this would need to be defined/imported into the `.stories` file
  },
  {
    path: '/mortgage-calculator',
    name: 'mortgage-calculator',
    component: Home // this would need to be defined/imported into the `.stories` file
  },
  {
    path: '/compound-interest-calculator',
    name: 'compound-interest-calculator',
    component: Home // this would need to be defined/imported into the `.stories` file
  }
]

const meta = {
  title: 'Layout/NavBar',
  component: NavBar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'fullscreen'
  },
  args: {
    // More on args: https://storybook.js.org/docs/vue/writing-stories/args
    // The args you need here will depend on your component
  },
  decorators: [vueRouter(customRoutes, { initialRoute: '/' })]
} satisfies Meta<typeof NavBar>

export default meta
type Story = StoryObj<typeof meta>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: (args) => ({
    components: { NavBar },
    setup() {
      return { args }
    },
    template: '<nav-bar v-bind="args" />'
  }),
  args: {
    // title: 'Primary Title'
  }
}
