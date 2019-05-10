var app = getApp()

Page({
  data: {
    newsList: [],
    lastid: 0, // 数据id
    toastHidden: true,
    confirmHidden: true,
    isfirst: 1,
    moreHidden: 'none',
    msg: '没有更多文章了',
  },

  loadData: function (lastid) {
    console.log('向服务器请求的初始元组id: ' + lastid)

    var limit = 4 //设置一次性文章加载数量
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
          //提示没有更多数据了
          that.setData({ toastHidden: false })
          //隐藏加载更多按钮
          that.setData({ moreHidden: 'none' })
          wx.showToast({
            title: '没有更多了...',
            icon:'none'
          })
          return false
        }else{
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
          that.setData({ moreHidden: '' })
        
        }
       
      },

      //获取服务器数据失败
      fail: function (res) {
        if (lastid == 0) {
          //获取缓存
          var newData = wx.getStorageSync('CmsList')
          if (newData) {
            that.setData({ newsList: newData })
            that.setData({ moreHidden: '' })

            var len = newData.length
            that.setData({ lastid: newData[len - 1].id })
          }

          console.log('data from cache')
        }
        else {
          that.setData({ toastHidden: false, moreHidden: 'none', msg: '当前网络异常，请稍后再试' })
        }
      }
    })
  },

  //监听页面加载 页面加载时触发
  onLoad: function (options) {
    console.log('onLoad: 加载lists页面')
    console.log(options)
    var that = this

    //请求数据
    console.log("开始向向服务器请求文章列表数据，从id=0开始请求")
    this.loadData(0);
  },

  //页面初次渲染完成时触发
  onReady: function () {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: '文章列表'
    })
  },

  touchArticle:function(options){
    console.log(options.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../pages/detail/detail?id='+options.currentTarget.dataset.id,
    })
  },
  tolower:function(){
    console.log("触发加载操作")
    this.loadData(this.data.lastid)
  },
  
})