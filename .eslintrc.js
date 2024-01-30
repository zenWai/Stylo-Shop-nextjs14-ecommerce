const { ECMA_VERSION } = require('@vercel/style-guide/eslint/constants');

module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/_base'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/node'),
    'next',
    'prettier',
    'next/core-web-vitals',
  ],
  parserOptions: {
    ecmaVersion: ECMA_VERSION,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
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
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
  },
};
