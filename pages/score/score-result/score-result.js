const app = getApp()
Page({
  data: {
    result:null,
    jsonDataLength:0 //jsonDataLength = 3（有辅修/双学位）
  },

  onLoad: function (options) {
    wx.hideLoading()
    if (options.result) {
      //将json字符串解析成json对象
      let result_obj = JSON.parse(options.result);
      //获取json对象长度
      var length = this.getJsonLength(result_obj)
      console.log(this.getJsonLength(result_obj))

      this.setData({
        result: result_obj,
        jsonDataLength: length
      });

      if (!result_obj) {
        this.showNoScoreToast();
      }
    }
  },

  //如果服务器返回的数据为null,则显示暂时没有出分消息框
  showNoScoreToast: function () {
    wx.showToast({
      title: '暂时没有出分...',
      icon: 'none',
      duration: 2000
    })
  },

  //获取json对象长度
  getJsonLength: function (jsonData) {
    var jsonLength = 0;
    for (var item in jsonData) {
      jsonLength++;
    }
    return jsonLength;
  }
})