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

  //返回上一页
  closepage: function(){
    //关闭当前页面，返回上一页面
    wx.navigateBack()
  }
})