module.exports = {
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  "plugins": [
  ],
  "env": {
  },
  "rules": {
    "default-case": 0,
    "no-sequences": 0,
    "testing-library/no-render-in-setup": 0,
  },
  "globals": {
    "any": "readonly"
  },
  "overrides": [
    {
      // Storybook specific rules
      "files": ["**/*.stories.*"],
      "rules": {
        "import/no-anonymous-default-export": "off"
      }
    }
  ]
};
