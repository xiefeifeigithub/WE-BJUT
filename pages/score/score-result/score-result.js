var score = require('../../../utils/score.js');
const app = getApp()
Page({
  data: {
    result:null,
    jsonDataLength:0, //jsonDataLength != 0（有辅修/双学位成绩）
    // year:'',  //学年
    // semester:'',  //学期
  },

  //加载成绩数据到界面上
  onLoad: function (options) {
    wx.hideLoading()
    // console.log(options.year + " " + options.semester)
    // this.data.year = options.year
    // this.data.semester = options.semester
    if (options.result) {
      //将json字符串解析成json对象
      var result_obj = JSON.parse(options.result)
      console.log(result_obj)
    
      //获取json对象长中other数组的长度
      var otherLength = result_obj.other.length
      console.log(otherLength)

      this.setData({
        result: result_obj,
        jsonDataLength: otherLength
      });

      if (!result_obj) {
        this.showNoScoreToast();
      }
    }
  },

  // //页面卸载时，更新该页面成绩数据到缓存
  // onUnload: function(options)
  // { 
  //   console.log("onUnload ~ pages/score/score-result 更新学期成绩")
  //   score.queryScoreBy_Year_Semester(this.data.year, this.data.semester)
  // },

  //如果服务器返回的数据为null,则显示暂时没有出分消息框
  showNoScoreToast: function () {
    wx.showToast({
      title: '暂时没有出分...',
      icon: 'none',
      duration: 2000
    })
  }
})