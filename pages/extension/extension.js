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
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Extension/Extension/getExtension', 
      data: { id: options.id, difference: difference },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        obj.setData({ info: res.data[0] })
      },
      fail: function (res) {
        wx.showToast({
          title: '获取数据失败,请检查网络连接',
        })
      }
    })
  },

  //用户点击右上角分享
  onShareAppMessage: function () {
  }
})