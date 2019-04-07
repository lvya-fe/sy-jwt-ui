var sessionStorage = require('store-fe/storages/sessionStorage')
var localStorage =  require('store-fe/storages/localStorage')
var cookieStorage =  require('store-fe/storages/cookieStorage')
var engine  = require('store-fe/src/store-engine')

var localStore = engine.createStore(localStorage)
var sessionStore = engine.createStore(sessionStorage)
var cookieStore = engine.createStore(cookieStorage)

export {
  localStore,
  sessionStore,
  cookieStore
}
