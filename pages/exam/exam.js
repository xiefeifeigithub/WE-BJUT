var app = getApp()
Page({
  data: {
    account: '', //用户名
    password: '', //密码
    examInfo: []  //考试信息
  },

  onLoad: function (options) {
    console.log("onload:加载考试信息页面")
    wx.showLoading({
      title: '加载中...',
    })
    var account = ''
    var password = ''
    var that = this
    account = wx.getStorageSync(app.data.keyUserName)
    password = wx.getStorageSync(app.data.keyPwd)
    if (account == '') {
      wx.switchTab({
        url: '../account/account',
      })
    }
    if (account != '' && password!='')
    {
      //查询考试信息
      wx.request({
        // https://www.bjut1960.cn/examination?xh=学号&mm=密码
        url: 'https://www.bjut1960.cn/examination?xh=' + account + '&mm=' + password,
        method: 'GET',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {

          if (res.statusCode == 200) {
            console.log("考试信息返回成功")
            that.setData({
              examInfo: res.data
            })
            wx.hideLoading()
          } else {
            console.log("404")
            wx.showToast({
              title: '请检查学号或密码是否正确',
              icon: 'none'
            })
          }
        },
        fail: function (res) {
          console.log('登录失败');
          console.log("转到身份认证界面")
          wx.switchTab({
            url: '../account/account',
          })
        }
      });
    }
    else{
      console.log("转到身份认证界面")
      wx.switchTab({
        url: '../account/account',
      })
    } 
  },
  //页面初次渲染完成时触发
  onReady: function () {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: '考试信息查询'
    })
  }
})