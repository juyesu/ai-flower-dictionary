const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin')
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
    },
    rules: {
      'no-console': 'warn',
    },
  },
]
