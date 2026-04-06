module.exports = {
  env: { node: true, browser: true, es2021: true },
  extends: ['eslint:recommended', 'plugin:security/recommended'],
  plugins: ['security'],
  rules: {
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    // Add more rules as needed
  },
};