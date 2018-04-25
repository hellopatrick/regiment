module.exports = {
  env: {
    node: true,
    browser: false,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
  plugins: ["node"],
  extends: ["eslint:recommended", "plugin:node/recommended"],
  rules: {
    "node/exports-style": ["error", "module.exports"],
    "no-console": 0,
  },
};
