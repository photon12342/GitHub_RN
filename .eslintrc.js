module.exports = {
  root: true,
  // extends: '@react-native-community',
  extends: [
    '@react-native-community',
    'standard', //使用standard做代码规范
    'prettier',
  ],
  plugins: ['prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    es6: true,
  },
  // required to lint *.vue files
  // add your custom rules here
  rules: {
    'prettier/prettier': 'error',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: 'off',
  },
}
