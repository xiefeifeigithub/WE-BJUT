// pages/account/account.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPwd: '',
    verifyCodeUrl: '',
    sessionId: ''
    
  },

  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },

  //确认绑定
  setStorage:function(){
    wx.setStorageSync("username", this.data.userName)
    wx.setStorageSync("userpassword", this.data.userPwd)
    console.log("用户名：" + this.data.userName + " 密码：" + this.data.userPwd);
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSessionIdAndCodeUrl()
    console.log("onLoad")
    // 从缓存中获取用户信息
    var username = app.globalData.username 
    var userpassword = app.globalData.userpassword
    var that = this
    that.setData({ userName: username })
    that.setData({ userPwd: userpassword })
    console.log(username);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: '个人中心'
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //获取验证码
  getSessionIdAndCodeUrl: function () {
    var that = this;
    wx.request({
      url: 'https://www.bjut1960.cn/get',
      method: 'GET',
      header: {
        "Content-Type": "application/json" // 
      },
      success: function (res) {
        console.log(res);
        var codeUrl = 'https://www.bjut1960.cn/static/';
        var fullUrl = codeUrl + res.data.sessionID + '.jpg';
        that.setData({ sessionId: res.data.sessionID, verifyCodeUrl: fullUrl });
      },
      fail: function () {
        console.log("获取sessionId失败");
      }
    });
  },
  //刷新验证码
  refreshVerifyCode: function () {
    this.getSessionIdAndCodeUrl();
    console.log('执行改变验证码')
  },

  //提交
  formSubmit: function (e) {
    console.log("mmp")
    console.log(e);
    var account = e.detail.value.userName;
    var password = encodeURIComponent(e.detail.value.password); //对密码进行编码防止特殊符号存在
    var verifyCode = e.detail.value.verifyCode;
    var flag = false;
    var that = this;
    wx.showLoading({
      title: '正在登录',
    });
    wx.request({
      url: 'https://www.bjut1960.cn/?xh=' + account + '&mm=' + password + '&yzm=' + verifyCode + '&id=' + this.data.sessionId,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        if (res.statusCode == 200) {
          console.log('登录成功');
          //登录成功 
          //1解析数据
          //2存储课表数据到本地
          //3存储当前学号到本地
          wx.setStorage({
            key: app.data.keyStudentNum,
            data: account,
          })
          console.log(res);
          app.parseTimetableData(res);
          wx.hideLoading();
          wx.navigateTo({
            url: '/pages/timetable/timetable',
          })
        } else {
          wx.showToast({
            title: '请检查学号、密码及验证码是否正确！',
            icon: 'none'
          })
          that.refreshVerifyCode();
        }
      },
      fail: function (res) {
        console.log('登录失败');
        console.log(res);
      }
    });
  },
})