/**
 * Created by ken on 2017/6/4.
 */
const FromDate = require('./FromDate')
const Time = require('./time')
module.exports = {
  formatNumber (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  /**
   *
   * @param date 千分位
   * @param fmt
   * @returns {*}
   */
  formatTime (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (typeof date === 'string') {
      date = date.replace(/-/g, '/')
    }
    date = new Date(date)
    if (!date) return '--'
    var o = {
      'M+': date.getMonth() + 1,                 // 月份
      'd+': date.getDate(),                    // 日
      'h+': date.getHours(),                   // 小时
      'm+': date.getMinutes(),                 // 分
      's+': date.getSeconds(),                 // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds()             // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },
  formatPrice (num) {
    return (Number(num).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  },
  /**
   * 将分为单位的number转换成人民币字符串输出
   * @param  {[type]} cent [description]
   * @return {[type]}      [description]
   */
  centToYuan (cent) {
    return '¥ ' + Number(cent / 100).toFixed(2)
  },
  /**
   * ::TODO 类转对象
   * @param o
   * @returns {{}}
   */
  classToObject(o) {
    o = new o()
    console.log(o)
    const classKeys = Object.getOwnPropertyNames(o.__proto__).concat(Object.getOwnPropertyNames(o))
    let pageConfig = {}
    classKeys.map(k => {
      pageConfig[k] = o[k]
    })
    return pageConfig
  },
  /**
   * wxAvatar
   * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140839
   * @param img
   * @param size 用户头像，最后一个数值代表正方形头像大小（有0、46、64、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
   * @returns {string}
   */
  wxAvatar(img, size = 132) {
    return img.substring(0, img.length - 1) + size
  },
  copy(o) {
    return JSON.parse(JSON.stringify(o))
  },
  FromDate,
  Time

}
