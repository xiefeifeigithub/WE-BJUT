var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    toastHidden: true,
    info: {},
    condition: true
  },

  onLoad: function(options) {
    //调用接口
    var common = require('../../utils/common.js');
    common.loadInfo(options.id, this, this.callback, this.cache);
  },

  //返回上一页
  callback: function(res) {
    var article = res.data.content
    var source = res.data.source
    var iscondition = this.data.condition
    console.log(source)
    if (source != "" && source != null) {
      this.setData({
        condition: !iscondition
      })
    }
    var that = this
    WxParse.wxParse('article', 'html', article, that, 5)
  }, //回调

  cache: function(info) {
    var article = info.content
    var source = info.source
    var that = this
    var iscondition = this.data.condition
    if (source != "" && source != null) {
      this.setData({
        condition: !iscondition
      })
    }

    WxParse.wxParse('article', 'html', article, that, 5)
  }, //缓存回调

  closepage: function() {
    //关闭当前页面，返回上一页面
    wx.navigateBack()
  },
  //提示当前网络不能用并自动返回上一页面
  totastChange: function() {
    this.setData({
      toastHidden: true
    })
    wx.navigateBack()
  },

  onShareAppMessage: function(res) {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') {}
    return {
      title: this.data.info.title,
      imageUrl: this.data.info.img,
      success: function(res) {}
    }
  }
})