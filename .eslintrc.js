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
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'function-expression',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    'import/no-default-export': 0,
    '@typescript-eslint/require-await': 0,
    camelcase: 0,
    '@typescript-eslint/no-shadow': 0,
    'no-nested-ternary': 0,
    'no-console': 0,
    'react/no-array-index-key': 0,
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/prefer-nullish-coalescing': 0,
  },
};
