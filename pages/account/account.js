// pages/account/account.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPwd: ''
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

  }
})