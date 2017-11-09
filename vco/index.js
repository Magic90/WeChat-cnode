let config = {}
try {
  config = require('../config') || config
} catch (e) {
  console.warn('根目录增加config.js 可以全局调用')
}
const mobx = require('./store/mobx')
require('./wx/wxToPromise')()
const Store = require('./store/Store')
const http = require('./wx/http')(config)
const helper = require('./helper/index')
const {page, app} = require('./wx/runTime')
const {requireMod} = require('./helper/reset')

const vco = {
  mobx,
  page,
  Store,
  app,
  http,
  helper,
  requireMod,
  config,
  data: {
    token: ''
  }
}
// 全局赋值
wx.vco = vco
//
module.exports = vco
