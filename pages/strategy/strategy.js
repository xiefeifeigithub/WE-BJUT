var app = getApp()
var common = require('../../utils/common.js');
Page({

  data:{  
    organizationArray:[],  //校内组织标签数组
    studentCommunity:[],   //学生社区标签数组
    newsList: [],  //精选文章数组
    lastid: 0, // 数据id
    first: 0,  //第一篇文章的id
    begin:0  //文章最大id
  },

  onLoad: function () {
    console.log('onLoad: pages/strategy')
    this.loadOrganization()  //加载校内组织标签

    this.loadStudentCommunity()  //加载学生社区标签
   
    this.loadData(this.data.lastid)  //加载精选文章  
 },

  //动态加载校内组织标签
  loadOrganization: function (){
    var lastid = 0
    var that = this
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
  },

  //动态加载学生社区标签
  loadStudentCommunity: function(){
    var lastid = 0
    var that = this
    wx.request({
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Learn/Learn/getLearn',
      data: { lastid: lastid },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({ studentCommunity: res.data })
      }
    })
  },

  //根据用户所点标签跳转到相应标签的文章列表
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

  //向服务器请求优质文章数据
  loadData: function (lastid) {
    console.log('向服务器请求的初始元组id: ' + lastid)

    var limit = 4 //设置一次性文章加载数量
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
          console.log("第一次记录文章最大id: " + begin )
        }

        //更新lastid
        if(lastid == 0)
        {
          var len = res.data.length
          that.setData({ lastid: res.data[len - 1].id })

          that.setData({ newsList: res.data })

          wx.setStorage({
            key: 'GoodCmsList',
            data: res.data,
          })

          return 
        }
        console.log(lastid)
        if(lastid <= 17)
        {
          that.setData({ lastid: 0 })

          var newData = wx.getStorageSync('GoodCmsList')
          that.setData({ newsList: newData })
        }
        else
        {
          var len = res.data.length
          that.setData({ lastid: res.data[len - 1].id })

          that.setData({ newsList: res.data })

          wx.setStorage({
            key: 'GoodCmsList',
            data: res.data,
          })
        }        
        console.log("当前lastid：" + lastid)
      },
      //获取服务器数据失败
      fail: function (res) {
        //获取服务器数据失败，从缓存中拿数据
        var newData = wx.getStorageSync('GoodCmsList')
        if (newData) {
          that.setData({ newsList: newData })

          var len = newData.length
          that.setData({ lastid: newData[len - 1].id })
        }
      }
    })
  },
  
  //在tabbar页面隐藏时更新精选文章
  onHide:function(){
    console.log("onHide pages/strateg ~ 更新精选文章")

    //更新文章最大id
    this.updataBegin()

    //加载新的文章
    this.loadData(this.data.lastid)
  },
  
  //更新文章最大id
  updataBegin:function(){
    var lastid = 0
    var limit = 4 
    var that = this

    var begin = this.data.begin

    //发起网络请求
    wx.request({
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Cms/Cms/getGoodList', 
      data: { lastid: lastid, limit: limit },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        //更新文章最大id
          that.setData({ begin: res.data[res.data.length - 1].id })
      },
      //获取服务器数据失败
      fail: function (res) {
       console.log("获取文章最大id失败")
      }
    })
  }
})