/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
const config = {
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'arrow-body-style': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-use-before-define': 'warn',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSEnumDeclaration',
        message: 'DO NOT DECLARE ENUM',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/require-default-props': [0],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true, // devDependenciesのimportを許可
        optionalDependencies: false,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          { pattern: '**/**.css', group: 'index', position: 'before' },
        ],
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};

module.exports = config;
