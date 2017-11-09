import WxParse from '../components/wxParse/wxParse.js'
const {Store, http} = wx.vco
const Api = {
  detail: '/topic/'
}

module.exports = class extends Store {
  state() {
    return {
      data: {
      }
    }
  }

  getDetail(id) {
    http.get(Api.detail + id, {}).then((data) => {
      console.log(`getDetail`, data)
      data.create_at = data.create_at.slice(0, 10)
      this.data = data
      let replies = []
      data.replies.map((item) => {
        item.content = WxParse.wxParse('wxParseData', 'html', item.content, this)
        item.create_at = item.create_at.slice(0, 10)
        replies.push(item)
      })
      data.replies = replies
      this.data = data
      this.data.content = WxParse.wxParse('wxParseData', 'html', data.content, this)
    })
  }
  resetData() {
    this.data = {}
  }
}
