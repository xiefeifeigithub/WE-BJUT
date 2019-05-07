var app = getApp()
Page({

  data:{
    organizationArray: [],  //组织机构
    ilovelearnArray:[]   //我爱学习
  },

  onLoad: function (options) {
    console.log('onLoad: 加载strategy页面')

    var that = this
    var lastid = 0

    //动态渲染标签列表
    wx.request({
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Organization/Organization/getOrganization', // 真实接口地址
      data: { lastid: lastid },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ organizationArray: res.data })
      }
    })
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