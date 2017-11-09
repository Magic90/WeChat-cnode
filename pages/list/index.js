const {page} = wx.vco
page({
  store: { list: 'list' },
  onLoad() {
    this.props.list.getList()
  },
  onPullDownRefresh() {
    this.props.list.getList({}, () => {
      wx.stopPullDownRefresh()
    }, true)
  },
  onReachBottom() {
    this.props.list.getList()
  },
  changeList(event) {
    const index = event.currentTarget.dataset.index
    this.props.list.getList(index)
  }
})
