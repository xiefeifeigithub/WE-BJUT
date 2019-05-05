// pages/extension/extension.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("所选轮播图id：" + options.id)
    var difference = ''
    if(options.id == 0) difference = '图0'
    if (options.id == 1) difference = '图1'
    if (options.id == 2) difference = '图2'
    if (options.id == 3) difference = '图3'

    var obj = this
    //发起网络请求
    wx.request({
      //  url: 'http://localhost:8080/weicms/index.php?s=/addon/Cms/Cms/getDetail', // 仅为示例，并非真实的接口地址
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Extension/Extension/getExtension', // 真实的接口地址
      data: { id: options.id, difference: difference },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("success")
        console.log(res.data)
        console.log(res.data[0])

        //利用setData设定数据
        obj.setData({ info: res.data[0] })

        console.log('data from server')

      },
      //获取服务器数据失败
      fail: function (res) {
        console.log('server error')
        obj.setData({ toastHidden: false, msg: '当前网络异常，请稍后再试' })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})