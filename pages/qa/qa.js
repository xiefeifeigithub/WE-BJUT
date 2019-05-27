const app = getApp()
Page({
  data: {
    qaList: [],
    lastid: 0,
  },
  loadData: function (lastid) {
    var limit = 100
    var that = this

    wx.request({
      url: app.data.url + 'addon/Questionandanswer/Questionandanswer/getQa',
      data: { lastid: lastid, limit: limit },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({ qaList: res.data })
        console.log('data from url');
      },
      fail: function (res) {
        console.log("获取QA数据失败")
      }
    })
  },
  //展开和折叠答案
  widgetsToggle: function (e) {
    var id = e.currentTarget.id, qaList = this.data.qaList;
    for (var i = 0, len = qaList.length; i < len; ++i) {
      if (qaList[i].id == id) {
        qaList[i].open = !qaList[i].open;
      } else {
        qaList[i].open = qaList[i].open;
      }
    }
    this.setData({
      qaList: qaList
    });
  },
  
  onLoad: function () {
    //如果本地有数据直接用
    var localData = wx.getStorageSync(app.data.keyQaList)
    if (localData) {
      console.log("从本地获取QA数据")
      this.setData({ qaList: localData })
    }
    else {
      this.loadData(0);
    }
  },

  onUnload: function () {
    var limit = 100
    var that = this
    var lastid = 0

    wx.request({
      url: app.data.url + 'addon/Questionandanswer/Questionandanswer/getQa',
      data: { lastid: lastid, limit: limit },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("旧数量：" + that.data.qaList.length)
        console.log("新数量：" + res.data.length)
        wx.setStorage({
          key: app.data.keyQaList,
          data: res.data,
        })
        
        console.log('触发更新QA数据')
      },
      fail: function (res) {
        console.log("QA数据更新失败")
      }
    })
  }
})