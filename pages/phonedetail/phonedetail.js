const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneList: [],  //指定标签的电话列表
    lastid: 0,  //数据id
    label: null  //分类标签
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.label = app.globalData.label
    var label = this.data.label
    console.log(label)
    //如果本地有数据直接用
    var localData = wx.getStorageSync(label)
    if(localData)
    {
      console.log("从本地获取phone数据 " + label)
      this.setData({ phoneList: localData })
    }
    else{
      this.loadData(0);
    }
  },

  //发起网络请求
  loadData: function (lastid) {
    var that = this
    console.log('app.data.url：' + app.data.url)
    var label = app.globalData.label //获取用户所选标签名
    console.log('获取用户所选电话label：' + label)

    wx.request({
      url: app.data.url + 'addon/Phone/Phone/getPhoneList',
      data: { lastid: lastid, label: label },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({ phoneList: res.data })
        console.log('data from url ' + that.data.label);
      },
      fail: function (res) {
        console.log("获取Phone数据失败 " + that.data.label)
      }
    })
  },


  onUnload: function () {

    var that = this
    var lastid = 0

    var label = this.data.label

    wx.request({
      url: app.data.url + 'addon/Phone/Phone/getPhoneList',
      data: { lastid: lastid, label:label },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.setStorage({
          key: label,
          data: res.data,
        })

        console.log('更新Phone数据 ' + that.data.label)
      },
      fail: function (res) {
        console.log("Phone数据更新失败 " + that.data.label)
      }
    })
  },

  //拨打电话
  callmeTap: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.label
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})