//获取应用实例
var app = getApp()
Page({
  data: {
    //轮播图
    imgUrls: [],  //轮播图内容
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //滑动动画时长
    inputShowed: false,
    inputVal: "",
    //导航数据
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
          icon: '/images/eng.png',
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
        }
      ]
  },

  onLoad: function () {
    var limit = 4 //加载4篇轮播图文章
    var lastid = 0

    var that = this

    wx.request({
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Imagetitle/Imagetitle/getImagetitle',
      data: { lastid: lastid, limit: limit},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)

        that.setData({ imgUrls: res.data })

        console.log("imgUrls: " + that.data.imgUrls)
      },
      fail: function (res) {
        console.log("服务器开小差了...")
      }
    })

  },

  clickImage: function (e) {
    console.log("轮播图点击跳转")
    var id = e.currentTarget.dataset.id;
    console.log("所选文章id：" + id)
    wx.navigateTo({
      url: '../../pages/extension/extension?id=' + id　　
    })
  }

})
