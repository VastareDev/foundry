/** @type {import("stylelint").Config} */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss'
  ],
  plugins: ['stylelint-scss'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ],
  rules: {
    'selector-class-pattern': [
      '^[a-z0-9\\-]+$',
      {
        message: 'Class names should be lowercase and hyphen separated.'
      },
    ],
    'scss/dollar-variable-pattern': [
      '^[_a-z0-9-]+$',
      {
        message: 'SASS variable names should be lowercase and hyphen separated.'
      }
    ],
    'no-descending-specificity': null
  },
  ignoreFiles: ['dist/**/*.css', 'node_modules/**/*']
};
