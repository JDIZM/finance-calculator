import NavBar from './NavBar.vue'
import type { Meta, StoryFn } from '@storybook/vue3'
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

export default {
  title: 'Layout/NavBar',
  component: NavBar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'fullscreen'
  },
  decorators: [vueRouter(customRoutes, { initialRoute: '/' })]
} as Meta<typeof NavBar>

const Template: StoryFn<typeof NavBar> = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NavBar },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { ...args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<NavBar />'
})

export const Default = Template.bind({})
