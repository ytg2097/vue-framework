'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://127.0.0.1:8760/"'
  // API_ROOT: '"http://47.116.19.68:8763/"'
  API_ROOT: '"http://127.0.0.1:8000/"'

})
