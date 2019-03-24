// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  //默认数据
  data: {
    toastHidden: true,
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('detail.onLoad')
    console.log(options)

    var that = this
    var key = 'info_' + options.id

    //发起网络请求
    wx.request({
      url: 'http://localhost:8080/weicms/index.php?s=/addon/Cms/Cms/getDetail', // 仅为示例，并非真实的接口地址
      data: { id: options.id },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        console.log(res.data)

        //利用setData设定数据
        that.setData({ info: res.data })

        //网络情况正常下，设置缓存
        console.log(key)
        wx.setStorageSync(key, res.data)
        console.log('data from url')

      },
      //获取服务器数据失败
      fail: function (res) {
        //获取缓存
        var info = wx.getStorageSync(key)
        if (info) {
          that.setData({ info: info })
          console.log('data from cache')
        }
        else {
          that.setData({ toastHidden: false, msg: '当前网络异常，请稍后再试' })
        }
      }
    })
  },

  //返回上一页
  closepage: function(){
    //关闭当前页面，返回上一页面
    wx.navigateBack()
  },
  //提示当前网络不能用并自动返回上一页面
  totastChange: function () {
    this.setData({ toastHidden: true })
    wx.navigateBack()
  },
})