const overrideCRA = require('../config-overrides');

module.exports = {
  stories: [
    // Design System
    '../src/docs/**/*.stories.mdx',
    // Components
    '../src/components/**/*.stories.mdx',
    // Pages
    '../src/pages/**/*.stories.mdx',
  ],
  // TODO Get this working with essentials
  addons: [
    "@storybook/addon-links",
    // "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    // '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
  ],
  refs: {
   'design-system': {
     title: "@thesoulfresh/sass-theming",
     url: "https://soulfresh.github.io/sass-theming"
   }
  },
  webpackFinal: (config) => {
    const custom = overrideCRA(config);
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...custom.resolve.alias,
        }
      },
      module: {
        ...config.module,
        rules: custom.module.rules,
      }
    }
  },
};
