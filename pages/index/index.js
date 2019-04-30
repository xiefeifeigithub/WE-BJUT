//获取应用实例
var app = getApp()
Page({
  data: {
    //轮播图
    imgUrls: [
      '',
      'http://tu.027cgb.com/618251/2.jpg',
      'http://tu.027cgb.com/618251/3.jpg',
      'http://tu.027cgb.com/618251/4.jpg',
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //滑动动画时长
    inputShowed: false,
    inputVal: "",
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
