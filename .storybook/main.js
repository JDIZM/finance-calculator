module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@chromatic-com/storybook'],

  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },

  docs: {
    autodocs: true
  }
}
