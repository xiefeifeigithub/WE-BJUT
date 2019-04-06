//获取应用实例
var app = getApp()
Page({
  data: {
    //电费查询
    electric: {},
    //导航数据
    student: [{
      icon: '/images/kjs.png',
      src: '/pages/core/curriculum/curriculum',
      title: '空教室'
    }, {
      icon: '/images/ck.png',
      src: '/pages/core/grade/grade',
      title: "蹭课"
    }, {
      icon: '/images/tsg.png',
      src: '/pages/core/exam/exam',
      title: "图书馆"
    }, {
      icon: '/images/kc.png',
      src: '/pages/core/library/library',
      title: "考场"
    }, {
      icon: '/images/cj.png',
      src: '/pages/core/campusCard/campusCard',
      title: '成绩'
    }, {
      icon: '/images/ykt.png',
      src: '/pages/core/net/net',
      title: '一卡通'
    }, {
      icon: '/images/xxfk.png',
      src: '/pages/core/electric/electric',
      bindtap: 'KFZ',
      title: "信息反馈"
    }, {
      icon: '/images/info.png',
      src: '/pages/core/finance/finance',
      title: '校园信息'
    }]
  },
  onShow: function () {
    var that = this;
    that.getNow();
    var name = app.globalData.userData.username,
      userid = app.globalData.userid,
      academic_year = app.globalData.time.academic_year,
      term = app.globalData.time.term;
    that.setData({
      name: name,
      userid: userid,
      academic_year: academic_year,
      term: term
    })
    that.getClass();
    that.getLibrary();
    that.getCardMessage();
    that.getNet();
    that.getElectric();
  },

  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.getClass();
    that.getLibrary();
    that.getCardMessage();
    that.getNet();
    that.getElectric();
    wx.showToast({
      title: '正在刷新',
      icon: 'loading',
      duration: 1000
    });
    wx.stopPullDownRefresh();
  },
})
