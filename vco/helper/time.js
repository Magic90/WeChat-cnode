module.exports = {
  getTime() {
    const _date = new Date()
    const year = _date.getFullYear()
    const month = _date.getMonth() + 1
    const date = _date.getDate()
    const time = `${year}-${month}-${date}`
    return time
  },
  /**
   * 是否为闰年
  */
  isLeapYear(year) {
    let leapYear = false
    if (year % 100 === 0) {
      leapYear = year % 400 === 0
    } else {
      leapYear = year % 4 === 0
    }
    return leapYear
  },
  /**
  * 获取时差
  */
  getJetLag(startTime, endTime, diffType) {
    startTime = startTime.replace(/\-/g, '/')
    endTime = endTime.replace(/\-/g, '/')
    diffType = diffType.toLowerCase()
    const sTime = new Date(startTime) // 开始时间
    const eTime = new Date(endTime) // 结束时间
    // 作为除数的数字
    let divisor = 1
    switch (diffType) {
      case 'second':
        divisor = 1000
        break
      case 'minute':
        divisor = 1000 * 60
        break
      case 'hour':
        divisor = 1000 * 3600
        break
      case 'day':
        divisor = 1000 * 3600 * 24
        break
      default:
        break
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divisor))
  }
}
