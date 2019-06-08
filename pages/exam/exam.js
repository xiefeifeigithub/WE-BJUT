var app = getApp()
Page({
  data: {
    examInfo: []  //考试信息
  },
  globalData: {
    account: null,
    pwd: null
  },

  globalData:{
    account: '', //用户名
    password: '', //密码
  },
  
  onLoad: function (options) {
    console.log("onload:加载考试信息页面")
    var localData = wx.getStorageSync(app.data.keyExamInfo)
    this.setData({
      examInfo:localData
    })
  },

  onReady: function () {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: '考试信息查询'
    })
    
  },
  //每次查看考试信息除了从缓存中读取第一次保存的信息之外，每次在退出页面之后进行最新的数据获取，并保存
  onShow: function () {
    this.globalData.account = wx.getStorageSync(app.data.keyUserName)
    this.globalData.pwd = wx.getStorageSync(app.data.keyPwd)
  },

  onUnload: function () {
    var account = this.globalData.account
    var password = this.globalData.pwd
    var that = this
    console.log("exam调用onUnload()");
    //考试信息
    wx.request({
      url: 'https://www.bjut1960.cn/examination',
      method: 'POST',
      data: {
        xh: account,
        mm: password
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          console.log("考试信息返回成功")
          wx.setStorage({
            key: app.data.keyExamInfo,
            data: res.data,
          })
          app.globalData.hasExamInfo = true;
          wx.hideLoading()
        } else {
          app.globalData.hasExamInfo = false;
          console.log("请求考试信息出错")
        }
      },
      fail: function (res) {
        console.log("请求考试信息出错:" + res)
        app.globalData.hasExamInfo = false;
      }
    });
    console.log('触发更新考试信息exam数据')
  },
})
