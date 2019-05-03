//获取应用实例
var app = getApp()
Page({
  data: {
    //轮播图
    imgUrls: [
      'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1556614129&di=fcd7943c0977b59a4ca78c6095ade45d&src=http://img1.3lian.com/2015/a1/70/d/104.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556624694415&di=1e9174459cbf85b08c89b54821139465&imgtype=0&src=http%3A%2F%2Ftvax2.sinaimg.cn%2Fcrop.0.0.1536.1536.1024%2F006PdLCLly8ffwrab5x9gj316o16oq69.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556624764155&di=1856c3e9fcc01b96f72ec83c94be69b1&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F33%2F36%2F5b87325daad77_610.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556624835119&di=8f9c6b17a36292ff21d2c2bfd6fe0330&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F29%2F20170329232408_KemfL.jpeg',
    ],
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
          icon: '/images/tsg.png',
          src: '../cet/cet',
          title: "四六级"
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
        }
      ]
  },


})
