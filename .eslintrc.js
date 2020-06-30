/* eslint-env node */
module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
  ],
  rules: {
    'vue/no-v-html': 'off',
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { args: 'all', argsIgnorePattern: '^_' },
    ],
  },
  env: {
    webextensions: true,
    node: true,
  },
}
