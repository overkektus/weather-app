module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  extends: ['eslint:recommended', 'plugin:cypress/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'no-console': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    '@typescript-eslint/explicit-function-return-type': 'warn', // Consider using explicit annotations for object literals and function return types even when they can be inferred.
    'no-empty': 'warn',
  },
}
