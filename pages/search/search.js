// pages/search/search.js

var WxSearch = require('../../wxSearch/wxSearch/wxSearch.js');
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

    console.log('wxSearch')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['图书馆', '校医院', '三教', '10号楼', '游泳馆'])
    //检索内容集合
    var mindKeys = ['校医院', '校园网', '图书馆', '微软正版软件'];
    WxSearch.initMindKeys(mindKeys);
    // WxSearch.initMindKeys(['图书馆', '校医院', '三教', '10号楼', '游泳馆', '微软正版软件'])
  },
  //点击搜索按钮
  wxSearchFn: function (e) {
    var that = this
    console.log("wxSearchFn")
    WxSearch.wxSearchAddHisKey(that);
  },
  //在输入框输入的时候
  wxSearchInput: function (e) {
    var that = this
    console.log("wxSearchInput")
    WxSearch.wxSearchInput(e, that);
  },
  //光标集中在输入框时
  wxSerchFocus: function (e) {
    var that = this
    console.log("wxSerchFocus")
    wx.redirectTo({
      url: '../search/search'
    })
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  //选择热门搜索
  wxSearchKeyTap: function (e) {
    var that = this
    console.log("wxSearchKeyTap")
    WxSearch.wxSearchKeyTap(e, that);
  },
  //删除搜索历史
  wxSearchDeleteKey: function (e) {
    var that = this
    console.log("wxSearchDeleteKey")
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },

  //查找不同类型文章
  querySpecifiedArticles: function (e) {
    wx.navigateTo({
      url: '../lists/lists'
    })

    var type = app.globalData.type
    console.log(e.currentTarget.dataset.text + '1111111111111111111111')
    app.globalData.type = e.currentTarget.dataset.text
    console.log(app.globalData.type)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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