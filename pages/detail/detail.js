Page({
  data: {
    toastHidden: true,
    info: {},
    condition: true
  },

  onLoad: function(options) {
    //调用接口
    console.log("跳转之后：")
    var common = require('../../utils/common.js')
    common.loadInfo(options.id, this)
  },
 
  //分享此页
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