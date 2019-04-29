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
      title: "成绩"
    }, {
      icon: '/images/kc.png',
      src: '/pages/core/library/library',
      title: "考试信息"
    }]
  },


})
