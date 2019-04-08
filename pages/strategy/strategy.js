// pages/aboutme/aboutme.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.url)
    wx.request({
      url: app.url + 'addon/Cms/Cms/testLogin',     
      data: { PHPSESSID: wx.getStorageSync('PHPSESSID') },
      success: function (res) {
        console.log(res);
      }
    })
  },

  
  netDescription: function (options) {
    wx.navigateTo({
      url: '../lists/lists'
    })

    var type = app.globalData.type
    app.globalData.type = "TSG"
    console.log(app.globalData.type)
  },

  microsoft: function (options) {
    wx.navigateTo({
      url: '../lists/lists'
    })

    var type = app.globalData.type
    app.globalData.type = "微软正版软件"
    console.log(app.globalData.type)
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //页面初次渲染完成时触发
  onReady: function () {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: 'BJUT-攻略'
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