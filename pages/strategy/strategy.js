var app = getApp()
Page({
  onLoad: function (options) {
    console.log('onLoad: 加载strategy页面')
  },

  //查找不同类型文章
  querySpecifiedArticles: function (e) {
    //导航到文章lists界面
    wx.navigateTo({
      url: '../lists/lists'
    })
    console.log('用户点击的标签：' + e.currentTarget.dataset.text)
    app.globalData.type = e.currentTarget.dataset.text
  },

  //页面初次渲染完成时触发
  onReady: function () {
    wx.setNavigationBarTitle({
      title: 'BJUT-攻略'
    })
  }
})