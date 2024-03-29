module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        sass: {
          // Require your Sass preprocessor here
          implementation: require('sass')
        }
      }
    }
  ],

  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },

  // features: {
  //   storyStoreV7: true
  // },

  docs: {
    autodocs: 'tag'
  }
}
