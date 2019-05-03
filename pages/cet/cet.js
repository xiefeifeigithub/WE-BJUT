// pages/cet/cet.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '', //用户名
    password: '', //密码
    cetInfo: []  //四六级考试成绩

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload:加载四六级信息页面")

    var account = this.data.account
    var password = this.data.password

    try {
      const value = wx.getStorageSync('username')
      if (value) {
        account = value
      }
    } catch (e) {
      wx.switchTab({
        url: '../account/account',
      })
    }

    try {
      const value = wx.getStorageSync('userpassword')
      if (value) {
        password = value
      }
    } catch (e) {
      wx.switchTab({
        url: '../account/account',
      })
    }

    var that = this
    if (account != '' && password != '') {
      //查询考试信息
      wx.request({
        // https://www.bjut1960.cn/grade?xh=学号&mm=密码
        url: 'https://www.bjut1960.cn/grade?xh=' + account + '&mm=' + password,
        method: 'GET',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {

          if (res.statusCode == 200) {
            console.log("考试信息返回成功")
            console.log(res)
            console.log(res.data[0])
           
            console.log(res.data)

            that.setData({
              cetInfo: res.data
            })

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
    else {
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
      title: '四六级成绩查询'
    })
  }
})