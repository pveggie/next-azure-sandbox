module.exports = {
  root: true,
  extends: ['airbnb-typescript', 'next/core-web-vitals', '../.eslintrc.js'],
  rules: {
    'react/jsx-props-no-spreading': [
      'error',
      {
        exceptions: ['Component'],
      },
    ],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        // specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.+(ts|tsx)'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
}
