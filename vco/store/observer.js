const {observable, autorun} = require('./mobx')
const toJS = require('./toJS')
const PageCls = function(OnLoad, OnUnload) {
  return {
    _update() {
      let props = this.props || {}
      props = toJS(props)
      this.setData({props})
    },
    onLoad() {
      this.props = observable(this.props)
      this._autorun = autorun(() => {
        this._update()
      })
      if (OnLoad) {
        OnLoad.apply(this, arguments)
      }
    },
    onUnload() {
      this._autorun()
      if (OnUnload) {
        OnUnload.apply(this, arguments)
      }
    }
  }
}
const observer = function(page) {
  let OnLoad = page.onLoad
  let OnUnload = page.onUnload
  return Object.assign(page, PageCls(OnLoad, OnUnload))
}
module.exports = observer
