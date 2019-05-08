var app = getApp()
Page({

  data:{  
    organizationArray:[],  //组织机构
    ilovelearnArray:[],   //我爱学习
    student:
      [
        {
          icon: '/images/kjs.png',
          src: '../timetable/timetable',
          title: '课表'
        },
        {
          icon: '/images/ck.png',
          src: '../rooms/rooms',
          title: "空教室"
        },
        {
          icon: '/images/tsg.png',
          src: '/pages/score/score-query',
          title: "成绩"
        },
        {
          icon: '/images/cet.png',
          src: '../cet/cet',
          title: "等级考试"
        },
        {
          icon: '/images/kc.png',
          src: '/pages/exam/exam',
          title: "考试信息"
        },
        {
          icon: '/images/ditu.png',
          src: '/pages/map/map',
          title: "地点查询"
        },
        {
          icon: '/images/dianhua.png',
          src: '/pages/phone/phone',
          title: '电话黄页'
        },
        {
          icon: '/images/qa.png',
          src: '/pages/qa/qa',
          title: '一问一答'
        }
      ]
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