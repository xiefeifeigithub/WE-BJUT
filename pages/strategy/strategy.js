var app = getApp()
Page({

  data:{  
    organizationArray:[],  //校内组织标签
    ilovelearnArray:[],   //学生社区标签
    newsList: [],  //精选文章
    lastid: 0, // 数据id
    first:0,
    begin:0
  },

  onLoad: function (options) {
    console.log('onLoad: strategy页面')

    var that = this
    var lastid = 0

    console.log('1.动态加载校内组织标签')
    wx.request({
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Organization/Organization/getOrganization', 
      data: { lastid: lastid },
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        that.setData({ organizationArray: res.data })
      }
    })

    console.log('2.动态加载学生社区标签')
    wx.request({
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Learn/Learn/getLearn', 
      data: { lastid: lastid },
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        that.setData({ ilovelearnArray: res.data })
      }
    })

    console.log('3.加载优质文章')
    this.loadData(this.data.lastid)  //函数调用  
 },

  //查找不同类型文章
  querySpecifiedArticles: function (e) {
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
  },

  loadData: function (lastid) {
    console.log('向服务器请求的初始元组id: ' + lastid)

    var limit = 8 //设置一次性文章加载数量
    var that = this

    var first = this.data.first
    var begin = this.data.begin

    //发起网络请求
    wx.request({
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Cms/Cms/getGoodList', // 真实接口地址
      data: { lastid: lastid, limit: limit},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("success:文章列表数据")

        //记录文章的最大id
        if (first==0)
        {
          that.setData({ first: 1})
          that.setData({ begin: res.data[res.data.length-1].id})
        }

        //更新lastid
        console.log(lastid)
        if(lastid <= 14)
        {
          that.setData({ lastid: that.data.begin})
        }
        else
        {
          var len = res.data.length
          that.setData({ lastid: res.data[len - 1].id })
        }        
        console.log(lastid)

        that.setData({ newsList: res.data })

        wx.setStorage({
          key: 'GoodCmsList',
          data: res.data,
        })
      },
      //获取服务器数据失败
      fail: function (res) {
        //获取缓存
        var newData = wx.getStorageSync('GoodCmsList')
        if (newData) {
          that.setData({ newsList: newData })

          var len = newData.length
          that.setData({ lastid: newData[len - 1].id })
        }
        console.log('获取服务器数据失败，从缓存中拿数据')
      }
    })
  },
  
  onHide:function(){
    console.log("更新精选文章")
    //加载新的文章
    this.loadData(this.data.lastid)
  }
})