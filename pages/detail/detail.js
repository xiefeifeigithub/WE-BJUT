// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  //默认数据
  data: {
    toastHidden: true,
   info: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用接口
    
    var common = require('../../utils/common.js');
    common.loadInfo(options.id,this,this.callback,this.cache);
  },
  
  //返回上一页
  callback: function (res){
    var article=res.data.content
    var that=this
    WxParse.wxParse('article', 'html', article, that, 5)
  },//回调

  cache: function (info) {
    var article = info.content
    var that = this
    WxParse.wxParse('article', 'html', article, that, 5)
  },//缓存回调

  closepage: function(){
    //关闭当前页面，返回上一页面
    wx.navigateBack()
  },
  //提示当前网络不能用并自动返回上一页面
  totastChange: function () {
    this.setData({ toastHidden: true })
    wx.navigateBack()
  },
})