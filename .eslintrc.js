module.exports = {
  env: {
    jest: true
  },

  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/essential'
  ],

  rules: {
    // surcharge les règles par défaut
    'no-undef': 'off',
    'no-console': 'warn'
  }
};
