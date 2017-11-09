module.exports = function(config) {
  const host = config.host
  /**
   * 公共提示
   * @param message
   */
  const $tips = function (message, minsecond = 1500, icon = 'loading') {
    let msg = ''
    if (typeof message === 'object') {
      Object.keys(message).map(k => {
        msg += `${message[k]}\n`
      })
    } else {
      msg = message
    }
    wx.showToast({
      title: msg,
      icon: icon,
      duration: minsecond
    })
  }
  const WxHttp = function (method = 'GET') {
    /**
     * @url 链接地址
     * @data 传输数据
     * @catchErrorCode 错误自定义
     * @header:{'content-type': 'application/x-www-form-urlencoded'||'application/json'}
     * @token=String
     */
    return function (url = '', data = {}, catchErrorCode, header, token = false) {
      url = (url.indexOf('http') > -1) ? url : `${host}${url}`

      token = token || wx.vco.data.token
      header = header || {'content-type': 'application/json'}
      if (token) {
        header.token = token
      }
      wx.showNavigationBarLoading() // 开始获取数据
      return new Promise((resolve, reject) => {
        wx.request({
          method: method,
          url: url,
          data: data,
          header: header,
          success(res) {
            wx.hideNavigationBarLoading()
            let {data, success, message} = res.data
            message = message || ''
            if (success) {
              return resolve(data)
            }
            if (catchErrorCode && typeof catchErrorCode === 'function') {
              catchErrorCode({data, success, message})
            } else {
              $tips(message)
            }
            return reject(res.data)
          },
          fail(e) {
            // console.log(e)
            reject(e)
          }
        })
      })
    }
  }
  const upload = function (filePath, opt, catchErrorCode) {
    const options = {
      fileName: 'file',
      url: config.path.upload,
      formData: {},
      header: {}
    }
    opt = Object.assign(options, opt)
    const {fileName, url, formData, header} = opt
    if (wx.vco.data.token) {
      header.token = wx.vco.data.token
    }
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${host}${url}`,
        filePath: filePath,
        header,
        formData,
        name: fileName,
        complete(res) {
          let cb = res.data
          cb = JSON.parse(cb)
          let {data, code, message} = cb
          message = message || ''
          if (code === 1) {
            return resolve(data)
          }
          if (catchErrorCode && typeof catchErrorCode === 'function') {
            catchErrorCode({data, code, message})
          } else {
            $tips(message)
          }
          return reject(res.data)
        },
        error(e) {
          reject(e)
        }
      })
    })
  }

  return {
    get: WxHttp('GET'),
    post: WxHttp('POST'),
    put: WxHttp('PUT'),
    del: WxHttp('DELETE'),
    upload
  }
}
