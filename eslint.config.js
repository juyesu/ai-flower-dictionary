const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin')
const tailwindPlugin = require('eslint-plugin-tailwindcss')
module.exports = [
  {
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      tailwindcss: tailwindPlugin,
    },
    rules: {
      'no-console': 'warn',
      'tailwindcss/classnames-order': 'warn',
    },
  },
]
