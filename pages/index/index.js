//获取应用实例
var app = getApp()
var common = require('../../utils/common.js');
// var score = require('../../utils/score.js');
Page({
  data: {
    //轮播图
    imgUrls: [],  //轮播图内容
    indicatorDots: false, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3500, //自动切换时间间隔
    duration: 1200, //滑动动画时长
    inputShowed: false,
    inputVal: "",

    //导航数据
    student:
      [
        {
          icon: '/images/kjs.png',   //0
          src: '../timetable/timetable',
          title: '课表'
        },
        {
          icon: '/images/ck.png',   // 1
          src: '../rooms/rooms',
          title: "空教室"
        },
        {
          icon: '/images/tsg.png',  // 2
          src: '/pages/score/score-query',
          title: "成绩"
        },
        {
          icon: '/images/cet.png',   //4
          src: '../cet/cet',
          title: "等级考试"
        },
        {
          icon: '/images/kc.png',   //3
          src: '/pages/exam/exam',
          title: "考试信息"
        },
        {
          icon: '/images/ditu.png',  //5 
          src: '/pages/map/map',
          title: "地点查询"
        },
        {
          icon: '/images/dianhua.png', //6
          src: '/pages/phone/phone',
          title: '电话黄页'
        },
        {
          icon: '/images/qa.png',  //7 
          src: '/pages/qa/qa',
          title: '一问一答'
        }
      ]
  },

  globalData:{
    account:"",
    password:""
  },

  //处理主页点击图标跳事件
  touchIcon: function (options) {
    console.log(options.currentTarget.dataset.index)
    var that = this
    switch (options.currentTarget.dataset.index) {
      case "0":
      //先判断用户是否登录过
        if (app.globalData.hasBaseInfo) {
          //有缓存的课表直接跳转课表显示,否则发起请求获取课表数据
          if(app.globalData.hasTimetableInfo){
            wx.navigateTo({
              url: '../timetable/timetable',
            })
          }else{
            wx.showLoading({
              title: '查询中...',
            })
            wx.request({
              url: 'https://www.bjut1960.cn/schedule',
              method: 'POST',
              data: {
                xh: that.globalData.account,
                mm: that.globalData.password
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log("实践课：" + JSON.parse(JSON.stringify(res.data.exercise)))
                if (res.statusCode == 200) {
                  //1解析课表数据
                  //2存储课表、实践课
                  wx.setStorage({
                    key: app.data.keyExerciseLesson,
                    data: res.data.exercise,
                  })
                  //console.log("课表数据\n" + JSON.parse(JSON.stringify(res.data.table)))
                  app.parseTimetableData(JSON.parse(JSON.stringify(res.data.table)));
                  app.globalData.hasTimetableInfo = true;
                  wx.hideLoading()
                  wx.navigateTo({
                    url: '../timetable/timetable',
                  })
                } else {
                  wx.hideLoading()
                  app.globalData.hasTimetableInfo = false;
                  wx.showToast({
                    title: '教务系统暂时无课表信息',
                    icon: 'none'
                  })
                }
              },
              fail: function (res) {
                wx.hideLoading()
                console.log('获取课表失败');
                app.globalData.hasTimetableInfo = false;
                console.log(res);
              }
            });
          }
          
        } else {
          wx.switchTab({
            url: '../account/account',
          })
        }
        break;
      case "1":
        wx.navigateTo({
          url: '../rooms/rooms',
        });
        break;
      case "2":
        //先判断用户是否登录过
        if (app.globalData.hasBaseInfo){
          wx.request({
            url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Score/Score/getCanuseScore',
            success:function(res){
              console.log(res)
              if(res.data[0].canuse == "1"){
                console.log("执行跳转逻辑")
                wx.navigateTo({
                  url: '../score/score-query',
                })
              } else if (res.data[0].canuse == "0"){
                wx.showToast({
                  title: '教务当前没有成绩数据',
                  icon: 'none'
                }); 
              }
            }
          })
        } else {
          wx.switchTab({
            url: '../account/account',
          })
        }
        break;
      case "4":
      //先判断用户是否登录过
        if (app.globalData.hasBaseInfo) {
          if(app.globalData.hasCetInfo){
            wx.navigateTo({
              url: '../cet/cet',
            });
          }else{
            wx.showLoading({
              title: 'CET成绩查询中...',
            })
            wx.request({
              url: 'https://www.bjut1960.cn/grade',
              method: 'POST',
              data: {
                xh: that.globalData.account,
                mm: that.globalData.password
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                if (res.statusCode == 200) {
                  console.log("查询cet信息成功")
                  wx.setStorage({
                    key: app.data.keyCet,
                    data: res.data,
                  })
                  wx.hideLoading()
                  app.globalData.hasCetInfo = true;
                  wx.navigateTo({
                    url: '../cet/cet',
                  });
                } else {
                  wx.hideLoading();
                  app.globalData.hasCetInfo = false;
                  wx.showToast({
                    title: '查询失败...',
                    icon: 'none'
                  })
                  console.log("查询cet信息失败")
                }
              },
              fail: function (res) {
                console.log('登录失败');
                app.globalData.hasCetInfo = false;
              }
            });
          }
        } else {
          wx.switchTab({
            url: '../account/account',
          })
        }
        break;
      case "3":
        if (app.globalData.hasBaseInfo){
          if(app.globalData.hasExamInfo){
            wx.navigateTo({
              url: '/pages/exam/exam',
            });
          }else{
            wx.showLoading({
              title: '考试信息查询中...',
            })
            wx.request({
              url: 'https://www.bjut1960.cn/examination',
              method: 'POST',
              data: {
                xh: that.globalData.account,
                mm: that.globalData.password
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                if (res.statusCode == 200) {
                  console.log("考试信息返回成功")
                  wx.setStorage({
                    key: app.data.keyExamInfo,
                    data: res.data,
                  })
                  app.globalData.hasExamInfo = true;
                  wx.hideLoading()
                  wx.navigateTo({
                    url: '/pages/exam/exam',
                  });
                } else {
                  wx.hideLoading()
                  app.globalData.hasExamInfo = false;
                  wx.showToast({
                    title: '查询失败...',
                    icon: 'none'
                  })
                  console.log("查询考试信息失败")
                }
              },
              fail: function (res) {
                console.log("请求考试信息出错:" + res)
                app.globalData.hasExamInfo = false;
              }
            });
          }
        }else {
          wx.switchTab({
            url: '../account/account',
          })
        }
        break;
      case "5":
        wx.navigateTo({
          url: '/pages/map/map',
        }); 
        break;
      case "6":
        wx.navigateTo({
          url: '/pages/phone/phone',
        }); 
        break;
      case "7":
        wx.navigateTo({
          url: '/pages/qa/qa',
        }); 
        break;
    }
  },
  
  onLoad: function () {
    this.updataData()
    console.log("onLoad ~ pages/index ~ 请求轮播图数据")
// yearArray: ['2018-2019', '2017-2018', '2016-2017', '2015-2016', '2014-2015'],
    // console.log("获取最新学年/学期成绩缓存")
    // score.queryScoreBy_Year_Semester('2018-2019','2')  //获取2018~2019年第2学期JSON字符串缓存
    //下一步将获取各个学期缓存分配到请求数少的页面，在具体查询某个时间段的结果后更新缓存、改写pages/score/score_result里的内容（xiefeifei)

  },

  //更新轮播图通告
  onHide: function (){
    this.updataData()
    console.log("onHide ~ pages/index ~ 更新轮播图数据")
    // console.log("获取最新学年/学期成绩缓存")
    // score.queryScoreBy_Year_Semester('2018-2019', '2')  //获取2018~2019年第2学期JSON字符串缓存
  },

  //更新轮播图通告
  updataData: function(){
    var limit = 4 //加载4篇轮播图文章
    var lastid = 0
    var that = this

    wx.request({
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Imagetitle/Imagetitle/getImagetitle',
      data: { lastid: lastid, limit: limit },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({ imgUrls: res.data })
      },
      fail: function (res) {
        console.log("服务器开小差了...")
      }
    })
  },

  //点击轮播图进入内容页
  clickImage: function (e) {
    console.log("轮播图点击跳转")
    var id = e.currentTarget.dataset.id;
    console.log("所选文章id：" + id)
    wx.navigateTo({
      url: '../../pages/extension/extension?id=' + id
    })
  },

  //获取缓存中的用户账号和密码
  onShow:function(){
    this.globalData.account = wx.getStorageSync(app.data.keyUserName)
    this.globalData.password = wx.getStorageSync(app.data.keyPwd)
  }

  // //用户点击右上角分享
  // onShareAppMessage: function () {
  // }

})
