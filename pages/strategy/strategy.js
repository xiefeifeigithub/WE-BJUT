// pages/aboutme/aboutme.js

var WxSearch = require('../../wxSearch/wxSearch/wxSearch.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    msg: '查找内容不存在',
    toastHidden: true
   
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
    WxSearch.init(that, 43, ['校园网基本说明', '微软正版软件', '乒乓球馆', 'IPV6'])
    WxSearch.initMindKeys(['校园网基本说明', 'IPV6', '微软正版软件', 'AutoCAD','Adobe全家桶','基本规定','培养计划','辅修和双学位','转专业','保研','绿色通道','助学贷款','贫困补助','励志奖','勤工俭学','考研','工作','出国','创业','健身房','游泳馆','羽毛球馆','乒乓球馆','社团名单','创建社团'])
  },

  //点击搜索按钮
  wxSearchFn: function (e) {

  //  this.wxSearchKeyTap(e)
    var that = this
    console.log("wxSearchFn")

    //处理输入框中的字符串
    var input = this.data.inputValue
    console.log('input:'+input)

    var str = this.data.inputValue
    var reg = RegExp(/校园网|软件安装|学籍管理|资助政策|未来之路|场馆中心|社团/);
    if (reg.exec(str)) {
      // 包含
      console.log("字符串处理：" + reg.exec(str))        
      
      app.globalData.classification = reg.exec(str)[0]
      console.log(app.globalData.classification)
      console.log('88888888888')

      //按照文章分类查找（大类找）
      wx.navigateTo({
        url: '../classificationlists/classificationlists'
      })
    }
    else{
      console.log('查找内容不存在')
      that.setData({ toastHidden: false })
    }

    

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
  //查找不同类型文章
  querySpecifiedArticles: function (e) {

    //该标签是否含有多篇文章(利用data-*)~按照大类别查找
    var viewNumber = e.currentTarget.dataset.number
    console.log(viewNumber)

    //该标签含有一篇文章~按照标签名查找
    

    wx.navigateTo({
      url: '../lists/lists'
    })

    var type = app.globalData.type
    console.log(e.currentTarget.dataset.text + '1111111111111111111111')
    app.globalData.type = e.currentTarget.dataset.text
    console.log(app.globalData.type)
  },
  //快捷键搜索
  wxConfirm: function (e) {
    this.wxSearchFn(e)
  },
  //提示没有更多数据
  totastChange: function () {
    this.setData({ toastHidden: true })
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