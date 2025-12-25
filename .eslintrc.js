export { 
  root: true,
  env: {
    node: true,
    es2023: true,
    browser: true
   },
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module'
  },
  plugins: ['import'],
  extends: ['eslint:recommended'],
  rules: {
    // Prefer ESM imports/exports
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.name='require']",
        message: 'Use ESM `import` instead of `require()` (project uses "type": "module")'
      }
    ],
    'no-undef': 'error'
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.cjs', '.mjs'] }
    }
  }
};
