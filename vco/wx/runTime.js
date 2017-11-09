const observer = require('../store/observer')
let $app = false
const page = function (o) {
  o = o || {}
  if (!$app) {
    $app = getApp()
  }
  o.$app = $app
  constructorFunc(o)
  o.beforeOnLoad && beforeOnLoadBuild(o)
  return Page(observer(o))
}
const app = function (o) {
  o = o || {}
  constructorFunc(o)
  return App(o)
}

const mixinsBuild = function(o) {
  o.mixins.map((obj) => {
    obj = (typeof obj === 'function') ? obj() : obj
    if (obj.store || o.store) {
      o.store = Object.assign(o.store || {}, obj.store || {})
      Object.keys(o.store).length > 0 && injectStore(o, o.store)
    }
    o.data = Object.assign(o.data || {}, obj.data || {})
    Object.keys(obj).map((key) => {
      if (!o[key]) {
        o[key] = obj[key]
      } else if (typeof o[key] === 'function') {
        const ownFun = o[key]
        o[key] = function () {
          ownFun.apply(this, arguments)
          obj[key].apply(this, arguments)
        }
      }
    })
  })
}
const beforeOnLoadBuild = function(o) {
  const onLoadFn = o.onLoad
  o.onLoad = function() {
    o.beforeOnLoad(() => {
      onLoadFn && onLoadFn.apply(this, arguments)
    })
  }
}
const constructorFunc = function (o) {
  if (o.mixins) {
    mixinsBuild(o)
  }
  if (o.store) {
    injectStore(o, o.store)
  }
  return o
}

const propsCache = {}
const injectStore = function (o, inject) {
  o.props = o.props || {}
  if (typeof inject === 'object') {
    Object.keys(inject).map((key) => {
      if (!propsCache[inject[key]]) {
        const cls = require(`../../stores/${inject[key]}`)
        propsCache[inject[key]] = new cls()
      }
      o.props[key] = propsCache[inject[key]]
    })
  }
}

module.exports = {
  app,
  page
}
