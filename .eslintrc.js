module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
  },
  "plugins": [
    "react",
  ],
  "globals": {
    "graphql": false,
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "ecmaVersion": 6,
      "jsx": true,
      "modules": true
    },
  }
}
