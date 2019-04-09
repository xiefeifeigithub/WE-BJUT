// pages/aboutme/aboutme.js

var WxSearch = require('../../wxSearch/wxSearch/wxSearch.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',

   
  },

  valueInput: function (e) {
    this.setData({
      value: e.detail.value
    })

    console.log(value)
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

   //搜索功能
    console.log('wxSearch')
    var that = this
      //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['校园网基本说明', '微软正版软件'])
    WxSearch.initMindKeys(['校园网基本说明', 'IPV6', '微软正版软件', 'AutoCAD','Adobe全家桶','基本规定','培养计划','辅修和双学位','转专业','保研','绿色通道','助学贷款','贫困补助','励志奖','勤工俭学','考研','工作','出国','创业','健身房','游泳馆','创建社团'])
  },
  //点击搜索按钮
  wxSearchFn: function (e) {
    var that = this
    console.log("wxSearchFn")
    //this.setData({ inputValue: e.detail.value })
    console.log(this.data.inputValue )
    //  console.log(e)
    wx.navigateTo({
      url: '../lists/lists'
    })

    var type = app.globalData.type
    console.log(e.currentTarget.dataset.key + '1111111111111111111111')
    app.globalData.type = e.currentTarget.dataset.key
    console.log(app.globalData.type)

    WxSearch.wxSearchAddHisKey(that);
  },
  //在输入框输入的时候
  wxSearchInput: function (e) {
    var that = this
    console.log("wxSearchInput")
    WxSearch.wxSearchInput(e, that);
    this.setData({ inputValue: e.detail.value})
    console.log(this.data.inputValue)

  },
  //光标集中在输入框时
  wxSerchFocus: function (e) {
    var that = this
    console.log("wxSerchFocus")
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

    console.log(e)
    wx.navigateTo({
      url: '../lists/lists'
    })

    var type = app.globalData.type
    console.log(e.currentTarget.dataset.key + '1111111111111111111111')
    app.globalData.type = e.currentTarget.dataset.key
    console.log(app.globalData.type)

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
  //点击完成
  wxConfirm: function(e) {
    this.wxSearchFn(e)
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