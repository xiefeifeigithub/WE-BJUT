//获取应用实例
var app = getApp()
Page({
  data: {
    //导航数据
    student: [{
      icon: '/images/kjs.png',
      // src: '/pages/core/curriculum/curriculum',
      src: '../timetable/timetable',
      title: '课表'
    }, {
      icon: '/images/ck.png',
      src: '../rooms/rooms',
      title: "空教室"
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

})
