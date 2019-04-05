'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const WebConfig = require('../webconfig/webconfig')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"' + WebConfig.GateWayServer.IP + '"'
})
