const app = getApp()
Page({
  data: {
    lastid: 0,  //数据id
    phoneSortArray:[]  //电话分类数组
  },

  loadData: function (lastid) {
    var that = this
    console.log('动态加载电话分类标签')

    wx.request({
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Sortphone/Sortphone/getSortPhone',
      data: { lastid: lastid },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        console.log(res.data)
        that.setData({ phoneSortArray: res.data })
      }
    })
  },

  onLoad: function () {
    console.log('onLoad: phoneSort分类页面')
    //如果本地有数据直接用
    var localData = wx.getStorageSync(app.data.keyPhoneSort)
    if(localData)
    {
      console.log("从本地获取phoneSort分类数据")
      this.setData({ phoneSortArray: localData })
    }
    else{
      this.loadData(0);
    }
  },
  
  onUnload: function () {
    var that = this
    var lastid = 0

    wx.request({
      url: app.data.url + 'addon/Sortphone/Sortphone/getSortPhone',
      data: { lastid: lastid},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.setStorage({
          key: app.data.keyPhoneSort,
          data: res.data,
        })

        console.log('更新PhoneSort分类数据')
      },
      fail: function (res) {
        console.log("PhoneSort分类数据更新失败")
      }
    })
  },

  //查找不同标签的电话列表
  queryPhoneDetail: function (e) {
    wx.navigateTo({
      url: '../phonedetail/phonedetail'
    })
    console.log('用户点击的电话分类标签：' + e.currentTarget.dataset.label)
    app.globalData.label = e.currentTarget.dataset.label
  },

  //页面初次渲染完成时触发
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '电话黄页'
    })
  },
})