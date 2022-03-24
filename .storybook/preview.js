import '../src/index.scss';

// Import stylesheets that allow us to use the sass-theming
// storybook components.
import '@thesoulfresh/sass-theming/components.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  grid: { cellSize: 8 },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#ffffff',
      },
      {
        name: 'light',
        value: '#f5f6fa',
      },
      {
        name: 'dark',
        value: '#555',
      },
    ],
  },
}
