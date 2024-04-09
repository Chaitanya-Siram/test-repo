module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'react-app',
    'react-app/jest',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@tanstack/query'],
  rules: {
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    semi: [1, 'always'],
    'comma-dangle': [0, 'never'],
    'space-before-function-paren': [0, 'never'],
    indent: [0, 'never'],
    'multiline-ternary': [0, 'never'],
  },
};
