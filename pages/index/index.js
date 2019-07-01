//获取应用实例
var app = getApp()
var common = require('../../utils/common.js');
// var score = require('../../utils/score.js');
var timeTable = require('../../utils/timeTable.js');
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

    currentDayTable:[],  //当天的课表
    currentWeekTable:[], //当周的课表

    todayTimeTable: [], //简化后的当天的课表
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
          var tableList = [];
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
                mm: that.globalData.password,
                xn: '2018-2019',
                xq: '1'
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log("课表数据")
                console.log(res.data)
                // console.log("实践课：" + JSON.parse(JSON.stringify(res.data.exercise)))
                if (res.statusCode == 200) {
                  //1解析课表数据
                  //2存储课表、实践课
                  wx.setStorage({
                    key: app.data.keyExerciseLesson,
                    data: res.data.exercise,
                  })
                  tableList = app.parseTimetableData(JSON.parse(JSON.stringify(res.data.table)));
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

    // //获取最新学期当天课表
    // this.showTodayTimeTable()
  },

  //获取最新学期当前周的课表
  showTodayTimeTable:function(){

    //将前一天的课程数据清除
    this.data.todayTimeTable = []
    this.data.currentWeekTable = []
    this.data.currentDayTable = []

    //获取当前周的数据
    timeTable.query_table('2019-2020', '1')
    if (app.globalData.hasTimetableInfo) {
      const localTimeTable = wx.getStorageSync(app.data.keyTimetable);
      if (localTimeTable) {
        this.data.currentWeekTable = timeTable.showTimetableByCurrentWeek(localTimeTable)
        this.currentTimeTable()
      }
      else {
        console.log("获取课表失败")
      }
    }
  },

  //统计最新学期当天的课表
  currentTimeTable:function(){
    var currentWeekTable = this.data.currentWeekTable
    var currentDay = new Date().getDay();
    console.log("今天是周" + currentDay)
    for (var i = 0; i < currentWeekTable.length; i++){
      if (currentWeekTable[i].week == currentDay){
        this.data.currentDayTable.push(currentWeekTable[i])
      }
    }

    //化简当天课表数据
    var tempList = this.data.currentDayTable;
    var lessonTime = '';   //上课时间
    var lessonNum = 0; //课程节数
    var lessonName = '';  //课程名
    var lessonLocation = '';  //上课地点
    var lessonStartTime = 0;  //课程开始时间
    var lessonEndTime = 0;  //课程结束时间

    console.log("当天课表数据")
    console.log(tempList)

    for (var i = 0; i < tempList.length; i++) {
      var tempStrArr1 = tempList[i].kcmc.split('\n');
      lessonName = tempStrArr1[0];
      var tempStrArr2 = tempStrArr1[2].split('@');
      lessonLocation = tempStrArr2[1];
      lessonTime = tempList[i].start + "~" + (tempList[i].start+tempList[i].lessonNum-1) + "节";
      lessonStartTime = tempList[i].start;
      lessonEndTime = tempList[i].start + (tempList[i].lessonNum-1);
      this.data.todayTimeTable.push({
        "lessonName" : lessonName,
        "location": lessonLocation,
        "time":lessonTime,
        "lessonStartTime": lessonStartTime,
        "lessonEndTime": lessonEndTime
      })
    }

    //处理当天课表中180分钟的大课
    var todayTimeTable = this.data.todayTimeTable
    for (var i = 0; i < todayTimeTable.length && todayTimeTable.length>=2; i++){
      if (i + 1 < todayTimeTable.length){
      if(todayTimeTable[i].lessonName==todayTimeTable[i+1].lessonName){
        todayTimeTable[i].lessonEndTime = todayTimeTable[i+1].lessonEndTime
        todayTimeTable.splice(i+1,1)
        todayTimeTable[i].time = todayTimeTable[i].lessonStartTime + "~" + todayTimeTable[i].lessonEndTime + "节";
      }
      }
    }

    this.data.todayTimeTable = todayTimeTable

    if(this.data.todayTimeTable.length==0)
    this.data.todayTimeTable = '今天没有课哦'

    console.log("当天课表")
    console.log(this.data.todayTimeTable)
    
  },

  //更新轮播图通告
  onHide: function (){
    this.updataData()
    console.log("onHide ~ pages/index ~ 更新轮播图数据")
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

    this.showTodayTimeTable()
  },
})
