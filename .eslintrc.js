module.exports = {
    plugins: ['@typescript-eslint'],
    parser: "vue-eslint-parser",
    parserOptions: {
      parser: '@typescript-eslint/parser'
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      'vue/no-v-html': 'off',
      'vue/component-name-in-template-casing': ['error', 'kebab-case'],
      '@typescript-eslint/indent': ['error', 2],
      '@typescript-eslint/no-unused-vars': ['warn', {'args': 'after-used'}]
    },
    "env": {
        "webextensions": true
    }
}
