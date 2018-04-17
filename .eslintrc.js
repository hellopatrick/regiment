module.exports = {
  env: {
    node: true,
    browser: false,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:node/recommended"],
  parserOptions: {
    ecmaVersion: 8,
  },
  rules: {
    "node/exports-style": ["error", "module.exports"],
  },
};
