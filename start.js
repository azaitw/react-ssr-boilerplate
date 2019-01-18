// Polyfill for Node server-side code
require('babel-polyfill')
require('babel-register')({
  presets: [
    'env',
    'es2015',
    'react'
  ],
  plugins: [
    'babel-plugin-styled-components',
    'transform-async-to-generator',
    'transform-object-rest-spread'
  ]
})

module.exports = require('./src/Server.js')
