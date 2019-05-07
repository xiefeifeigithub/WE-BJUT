const app = getApp()
Page({
  data: {
    qaList: [],
    lastid: 0,
    toastHidden: true,
    confirmHidden: true,
    isfrist: 1,
    moreHidden: 'none',
    msg: '其余数据正在收集中...',
  


  },
  loadData: function (lastid) {


    var limit = 50
    var that = this
    console.log('app.data.url：' + app.data.url)

    wx.request({
      url: app.data.url + 'addon/Questionandanswer/Questionandanswer/getQa',
      data: { lastid: lastid, limit: limit },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (!res.data) {
          that.setData({ toastHidden: false })
          that.setData({ moreHidden: 'none' })
          return false
        }
        var len = res.data.length
        var oldLastid = lastid
        that.setData({ lastid: res.data[len - 1].id })

        var dataArr = that.data.qaList
        var newData = dataArr.concat(res.data);

        if (oldLastid == 0) {
          wx.setStorageSync(app.data.keyQaList, newData)
        }
        that.setData({ qaList: newData })
        console.log(that.data.qaList)
        that.setData({ moreHidden: '' })
        console.log('data from url');
      },
      fail: function (res) {
        if (lastid == 0) {
          var newData = wx.getStorageSync(app.data.keyQaList)
          if (!newData) {
            that.setData({ qaList: newData })
            that.setData({ moreHidden: '' })

            var len = newData.length
            that.setData({ lastid: newData[len - 1].id })
          }
          console.log('data from cache');
        } else {
          that.setData({ toastHidden: false, moreHidden: 'none', msg: '当前网格异常，请稍后再试' })
        }
      }
    })
  },
  loadMore: function (event) {
    var id = event.currentTarget.dataset.lastid
    var isfrist = event.currentTarget.dataset.isfrist
    var that = this

    wx.getNetworkType({
      success: function (res) {
        var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi

        if (networkType != 'wifi' && isfrist == '1') {
          that.setData({ confirmHidden: false })
        }
      },
      
    })

    this.setData({ isfrist: 0 })
    this.loadData(id);
  },
  onLoad: function () {
    this.loadData(0);

  },

  toastChange: function () {
    this.setData({ toastHidden: true })
  },
  modalChange: function () {
    this.setData({ confirmHidden: true })
  },
  
})