/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  arrowParens: 'always',
  overrides: [
    {
      files: '*.scss',
      options: {
        singleQuote: true
      }
    },
    {
      files: ['*.md', '*.markdown'],
      options: {
        proseWrap: 'always'
      }
    }
  ]
};
