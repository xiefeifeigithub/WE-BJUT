var app = getApp()

Page({
  data: {
    account: '',      //用户名
    password: '',     //密码
    cetInfo: []       //四六级考试成绩
  },
  globalData:{
    account:null,
    pwd:null
  },
  
  onLoad: function (options) {
    //如果本地有缓存直接使用本地的数据
    var localData = wx.getStorageSync(app.data.keyCet)
    console.log("从本地缓存中获取cet数据")
    this.setData({
      cetInfo:localData
    })
  },

  //页面初次渲染完成时触发
  onReady: function () {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: '等级考试信息查询'
    })
  },

  //每次查看CET信息除了从缓存中读取第一次保存的信息之外，每次在退出页面之后进行最新的数据获取，并保存
  onShow:function(){
    this.globalData.account = wx.getStorageSync(app.data.keyUserName)
    this.globalData.pwd = wx.getStorageSync(app.data.keyPwd)
  },

  onUnload:function(){
    var account = this.globalData.account
    var password = this.globalData.pwd
    var that = this
    //四六级考试信息
    wx.request({
      url: app.data.url_crawler + 'cet',
      method: 'POST',
      data: {
        xh: account,
        mm: password
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.statusCode == 200) {
          console.log("CET信息返回成功")
          that.setData({
            cetInfo: res.data
          })
          wx.setStorage({
            key: app.data.keyCet,
            data: res.data,
          })
          wx.hideLoading()
          app.globalData.hasCetInfo = true;
        } 
        else {
          console.log("获取CET数据失败")
          app.globalData.hasCetInfo = false;
        }
      },
      fail: function (res) {
        console.log('获取CET数据失败');
        app.globalData.hasCetInfo = false;
      }
    });
    console.log('触发更新CET数据函数onUnload()')
  }
})