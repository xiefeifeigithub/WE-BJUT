// pages/lists/lists.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[
      { id:1, title:"aaaaaaaaaa", img:"../../images/1.png", cTime:"2019-3-17 10:11" },
      { id:2, title:"bbbbbbbbbb", img:"../../images/2.png", cTime:"2019-3-17 10:11" },
      { id:3, title:"cccccccccc", img:"../../images/3.png", cTime:"2019-3-17 10:11" },
      { id:4, title:"dddddddddd", img:"../../images/4.png", cTime:"2019-3-17 10:11" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //http://localhost:8080/weicms/index.php?s=/addon/Cms/Cms/getlist


    console.log('onLoad')
    var that = this

    //发起网络请求
    wx.request({
      url: 'http://localhost:8080/weicms/index.php?s=/addon/Cms/Cms/getlist', // 仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        //利用setData设定数据
        that.setData({
          newsList: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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