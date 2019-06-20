var app = getApp()

Page({
  data: {
    newsList: [],  //文章列表数组
    lastid: 0 // 数据id
  },

  //根据用户所选标签加载相应标签的文章列表
  loadData: function (lastid) {
    console.log('当前文章的id: ' + lastid)

    var limit = 8 //设置一次性文章加载数量
    var type = app.globalData.type //获取用户所选标签名
    console.log('获取用户所选标签名：' + type)
    var that = this

    wx.request({
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Cms/Cms/getlist', 
      data: {lastid:lastid, limit:limit,type:type},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (!res.data) {
          wx.hideLoading()
          wx.showToast({
            title: '没有更多了...',
            icon:'none'
          })
          return false
        }
        else{
          //更新lastid
          console.log(lastid)
          var len = res.data.length
          var oldLastid = lastid
          that.setData({ lastid: res.data[len - 1].id })
          console.log(lastid)

          //新旧内容拼接
          var dataArr = that.data.newsList
          var newData = dataArr.concat(res.data);

          //设置文章数据缓存
          if (oldLastid == 0) {
            wx.setStorageSync('CmsList', newData)
          }

          //利用setData设定数据
          that.setData({ newsList: newData })
        }
      },

      //获取服务器数据失败
      fail: function (res) {
        if (lastid == 0) {
          //获取缓存
          var newData = wx.getStorageSync('CmsList')
          if (newData) {
            that.setData({ newsList: newData })

            var len = newData.length
            that.setData({ lastid: newData[len - 1].id })
          }
          console.log('data from cache')
        }
        else {
          wx.showToast({
            title: '网络出现问题了...',
            icon: 'none'
          })
        }
      }
    })
  },

  //向服务器请求文章列表数据
  onLoad: function (options) {
    // 获取了屏幕高度
    let scrollHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      scrollHeight: scrollHeight
    });

    console.log('onLoad: 加载lists页面')
    var that = this

    //请求数据
    console.log("开始向向服务器请求文章列表数据，从id=0开始请求")
    this.loadData(0);
  },

  //页面初次渲染完成时触发
  onReady: function () {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: app.globalData.type
    })
  },

  //点击列表文章，跳转到文章内容页
  touchArticle:function(options){
    console.log("文章在数据库中的id: " + options.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../pages/detail/detail?id='+options.currentTarget.dataset.id,
    })
  },
  
  //触底后加载新文章
  tolower:function(){
    console.log("触发加载操作")
    //加载新的文章
    this.loadData(this.data.lastid)
  },
  
})