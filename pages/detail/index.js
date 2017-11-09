const {page} = wx.vco

page({
  store: { detail: 'detail' },
  onLoad({id}) {
    console.log(`onLoad`, id)
    this.props.detail.getDetail(id)
  },
  onUnload() {
    this.props.detail.resetData()
  }
})
