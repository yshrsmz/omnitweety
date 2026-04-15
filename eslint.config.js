import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  // Global ignores
  {
    ignores: ['node_modules/', 'dist/', '.output/', '.wxt/', 'pnpm-lock.yaml'],
  },

  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,

  // TypeScript and Vue files
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.webextensions,
      },
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'vue/no-v-model-argument': 'off',
    },
  },

  // Vue SFCs: top-level bindings in `<script setup>` are consumed by the
  // template, which eslint core's `no-useless-assignment` cannot see.
  {
    files: ['**/*.vue'],
    rules: {
      'no-useless-assignment': 'off',
    },
  },

  // JavaScript config files
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  }
)
