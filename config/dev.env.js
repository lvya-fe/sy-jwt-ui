'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT:'"/"'
  // API_ROOT:'"http://sy.lvya.org/"',
  API_ROOT:'"http://sy-test.lvya.org/"'
  // API_ROOT: '"http://192.168.0.107:8080/"'
})
