const app = getApp()
Page({
  data: {
    phoneList: [], 
    lastid: 0  //数据id
  },
  loadData: function (lastid) {
    var limit = 100
    var that = this
    console.log('app.data.url：' + app.data.url)

    wx.request({
      url: app.data.url + 'addon/Telephone/Telephone/getPhone',
      data: { lastid: lastid, limit: limit },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({ phoneList: res.data })
        console.log('data from url');
      },
      fail: function (res) {
        console.log("获取Phone数据失败")
      }
    })
  },

  //拨打电话
  callmeTap: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },

  onLoad: function () {
    //如果本地有数据直接用
    var localData = wx.getStorageSync(app.data.keyPhoneList)
    if(localData)
    {
      console.log("从本地获取phone数据")
      this.setData({ phoneList: localData })
    }
    else{
      this.loadData(0);
    }
  },
  
  onUnload: function () {
    var limit = 100
    var that = this
    var lastid = 0

    wx.request({
      url: app.data.url + 'addon/Telephone/Telephone/getPhone',
      data: { lastid: lastid, limit: limit },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.setStorage({
          key: app.data.keyPhoneList,
          data: res.data,
        })

        console.log('触发更新Phone数据')
      },
      fail: function (res) {
        console.log("Phone数据更新失败")
      }
    })
  }
})