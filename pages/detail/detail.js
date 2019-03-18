// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: { 
        id: 1, 
        title: "aaaaaaaaaa", 
        img: "../../images/1.png", 
        cTime: "2019-3-17 10:11", 
        content: "当清晨的一缕阳光透过窗帘上的空隙映照在沉睡的脸庞时，微微张开的双眼朦胧地注视着周遭的一切，新的一天悄然而至"
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    
    console.log(options)

    //发起网络请求
    wx.request({
      url: 'http://localhost:8080/weicms/index.php?s=/addon/Cms/Cms/getDetail', // 仅为示例，并非真实的接口地址
      data: {id:options.id},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        //利用setData设定数据
        that.setData({
          info: res.data
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