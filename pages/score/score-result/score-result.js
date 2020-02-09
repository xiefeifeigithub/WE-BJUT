var score = require('../../../utils/score.js');
const app = getApp()

Page({
  data: {
    result:null,
    otherLength:0, //otherLength != 0（有不计入加权的课程）
    minorLength:0
  },

  //加载成绩数据到界面上
  onLoad: function (options) {
    wx.hideLoading()
    if (options.result) {
      //将json字符串解析成json对象
      var result_obj = JSON.parse(options.result)
      // console.log(result_obj)
    
      //获取json对象长中other数组的长度
      var otherLength_obj = result_obj.other.length

      //获取辅修专业数据长度
      var minorLength_obj = result_obj.minor.length

      this.setData({
        result: result_obj,
        otherLength: otherLength_obj,
        minorLength: minorLength_obj
      })

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
  }
})