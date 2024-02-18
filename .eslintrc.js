module.exports = {
  extends: ['next', 'prettier', 'next/core-web-vitals'],
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all',
      },
    ],
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
}
