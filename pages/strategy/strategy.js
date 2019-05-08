var app = getApp()
Page({

  data:{  
    organizationArray:[],  //校内组织
    ilovelearnArray:[],   //学生社区
    newsList: [],
    lastid: 0, // 数据id
    // student:
    //   [
    //     {
    //       icon: '/images/kjs.png',
    //       src: '../timetable/timetable',
    //       title: '课表'
    //     },
    //     {
    //       icon: '/images/ck.png',
    //       src: '../rooms/rooms',
    //       title: "空教室"
    //     },
    //     {
    //       icon: '/images/tsg.png',
    //       src: '/pages/score/score-query',
    //       title: "成绩"
    //     },
    //     {
    //       icon: '/images/cet.png',
    //       src: '../cet/cet',
    //       title: "等级考试"
    //     },
    //     {
    //       icon: '/images/kc.png',
    //       src: '/pages/exam/exam',
    //       title: "考试信息"
    //     },
    //     {
    //       icon: '/images/ditu.png',
    //       src: '/pages/map/map',
    //       title: "地点查询"
    //     },
    //     {
    //       icon: '/images/dianhua.png',
    //       src: '/pages/phone/phone',
    //       title: '电话黄页'
    //     },
    //     {
    //       icon: '/images/qa.png',
    //       src: '/pages/qa/qa',
    //       title: '一问一答'
    //     }
    //   ]
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

    //动态渲染标签列表
    wx.request({
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Learn/Learn/getLearn', // 真实接口地址
      data: { lastid: lastid },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ ilovelearnArray: res.data })
      }
    })

    console.log('onLoad: 加载lists页面')
    console.log(options)
    var that = this

    //请求数据
    console.log("开始向向服务器请求文章列表数据，从id=0开始请求")
    this.loadData(0);
    
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
  },
  loadData: function (lastid) {
    console.log('向服务器请求的初始元组id: ' + lastid)

    var limit = 10 //设置一次性文章加载数量
    // var type = app.globalData.type //获取用户所选标签名
 //   console.log('获取用户所选标签名：' + type)
    ///把this对象复制到临时变量that
    var that = this

    //发起网络请求
    wx.request({
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Cms/Cms/getGoodList', // 真实接口地址
      data: { lastid: lastid, limit: limit},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (!res.data) {
          //提示没有更多数据了
          that.setData({ toastHidden: false })
          //隐藏加载更多按钮
          that.setData({ moreHidden: 'none' })
          return false
        }
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
          wx.setStorageSync('GoodCmsList', newData)
        }

        //利用setData设定数据
        that.setData({ newsList: newData })
        that.setData({ moreHidden: '' })

        console.log('data from url')
      },

      //获取服务器数据失败
      fail: function (res) {
        if (lastid == 0) {
          //获取缓存
          var newData = wx.getStorageSync('GoodCmsList')
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
  }
})