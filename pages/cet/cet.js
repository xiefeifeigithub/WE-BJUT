var app = getApp()
Page({
  data: {
    account: '',      //用户名
    password: '',     //密码
    cetInfo: []       //四六级考试成绩
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //如果本地有缓存直接使用本地的数据
    var localData = wx.getStorageSync(app.data.keyCet)
    console.log("从本地获取cet数据")
    this.setData({
      cetInfo:localData
    })
  },
  //页面初次渲染完成时触发
  onReady: function () {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: '等级考试信息查询'
    })
  }
})