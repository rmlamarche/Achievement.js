module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
    jquery: false,
    jest: true,
    mongo: true
  },
  extends:
    'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType:
      'module'
  },
  rules: {
    indent: [
      'error',
      'tab'
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode:
          'strict'
      }
    ],
    'no-trailing-spaces':
      'error',
    'no-nested-ternary':
      'error',
    'no-whitespace-before-property':
      'error',
    'no-unused-vars': [
      'error',
      {
        args:
          'after-used'
      }
    ],
    'space-in-parens': [
      'error',
      'never'
    ],
    'space-before-function-paren': [
      'error',
      'never'
    ],
    'space-before-blocks':
      'error'
  }
};
