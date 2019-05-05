// pages/exam/exam.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '', //用户名
    password: '', //密码
    examInfo: []  //考试信息
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload:加载考试信息页面")
    var localData = wx.getStorageSync(app.data.keyExamInfo)
    this.setData({
      examInfo:localData
    })
 
  },
  //页面初次渲染完成时触发
  onReady: function () {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: '考试信息查询'
    })
  }
})