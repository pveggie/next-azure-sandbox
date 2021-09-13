module.exports = {
  extends: ['airbnb-typescript', '../.eslintrc.js'],
  ignorePatterns: ['dist/'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  overrides: [
    {
      files: ['**/*.+(ts|tsx)'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
    },
  ],
}
