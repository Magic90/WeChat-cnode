const { Store, http } = wx.vco
const Api = {
  list: `/topics`
}

module.exports = class extends Store {
  state() {
    return {
      list: {
        tabs: [
          {
            data: [],
            page: 1,
            pageSize: 20,
            tabName: '全部',
            id: 'all'
          },
          {
            data: [],
            page: 1,
            pageSize: 20,
            tabName: '精华',
            id: 'good'
          },
          {
            data: [],
            page: 1,
            pageSize: 20,
            tabName: '分享',
            id: 'share'
          },
          {
            data: [],
            page: 1,
            pageSize: 20,
            tabName: '问答',
            id: 'ask'
          },
          {
            data: [],
            page: 1,
            pageSize: 20,
            tabName: '招聘',
            id: 'job'
          }
        ],
        index: 0,
        isLoading: false
      }
    }
  }

  getList(index, isReload) {
    if (this.isLoading) return
    this.isLoading = true
    index = index || index === 0 ? index : this.list.index
    if (isReload) {
      this.list.tabs[index].page = 1
    }
    let page = this.list.tabs[index].page
    let pageSize = this.list.tabs[index].pageSize

    http.get(Api.list, { tab: this.list.tabs[index].id, page: page, limit: pageSize }).then((data) => {
      let _data = []
      data.map((item) => {
        item.content = ''
        _data.push(item)
      })
      this.list.tabs[index].data = this.list.tabs[index].page === 1 ? _data : this.list.tabs[index].data.concat(_data)
      console.log(`getList`, this.list.tabs[index])
      this.list.index = index
      this.list.tabs[index].page = this.list.tabs[index].page + 1
      this.isLoading = false
    })
  }
}
