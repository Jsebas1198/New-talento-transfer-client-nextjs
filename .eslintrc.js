const nextEslintConfig = require('next/eslint');

module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    ...nextEslintConfig.extends, // Merge Next.js config extends
    'next/core-web-vitals',
  ],
  rules: {
    semi: ['error', 'always'],
  },
};
