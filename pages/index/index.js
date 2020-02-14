//获取应用实例
var app = getApp()

var common = require('../../utils/common.js');
var timeTable = require('../../utils/timeTable.js')
var timeFormat = require('../../utils/util.js')
var util = require('../../utils/util.js')

Page({
  data: {
    //轮播图
    imgUrls: [
        {img:'../../images/tu0.jpg'} ,  
        {img:'../../images/tu1.jpg'} ,  
        {img:'../../images/tu2.jpg'} ,  
        {img:'../../images/tu3.jpg'}   ],  //轮播图内容
    indicatorDots: false, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3500, //自动切换时间间隔
    duration: 1200, //滑动动画时长
    inputShowed: false,
    inputVal: "",

    //用来一步一步得到距离当前时间最近的一节课数据
    currentDayTable:[],  //当天的课表
    currentWeekTable:[], //当周的课表
    todayTimeTable: [], //简化后的当天的课表
    nearestTimeTable: [],   //距离当前最近的一节课
    todayHaveClass: false,   //今天是否有课
    todayFinishClass:false  //今天的课是否上完了
  },

  globalData:{
    account:"",
    password:"",
    passwordVpn:""
  },

  //事件：课表
  touchTimetableIcon: function (options) {
    console.log("Click Schedule")

    var that = this

    //先判断用户是否登录
    if(app.globalData.hasBaseInfo) {
      //有缓存的课表直接跳转课表显示,否则发起请求获取课表数据
      var tableList = []
      if (app.globalData.hasTimetableInfo) {
        wx.navigateTo({
          url: '../timetable/timetable',
        })
      }
      else{
        wx.showLoading({
          title: '查询中...',
        })

        wx.request({
          url: app.data.url_crawler + 'schedule',
          method: 'POST',
          data: {
            xh: that.globalData.account,
            mm: that.globalData.password,
            vpn_pwd: that.globalData.passwordVpn,
            xn: '2019-2020',
            xq: '2'
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // console.log("课表数据")
            // console.log(res.data)
            // console.log("实践课：" + JSON.parse(JSON.stringify(res.data.exercise)))
            if (res.statusCode == 200) {
              //1解析课表数据
              //2存储课表、实践课
              wx.setStorage({
                key: app.data.keyExerciseLesson,
                data: res.data.exercise,
              })
              tableList = app.parseTimetableData(JSON.parse(JSON.stringify(res.data.table))); //解析并存储课表数据
              app.globalData.hasTimetableInfo = true;
              wx.hideLoading()
              wx.navigateTo({
                url: '../timetable/timetable',
              })
            } 
            else {
              wx.hideLoading()
              app.globalData.hasTimetableInfo = false;
              wx.showToast({
                title: '没有课表数据',
                icon: 'none'
              })
            }
          }, //success
          fail: function (res) {
            wx.hideLoading()
            console.log('获取课表失败');
            app.globalData.hasTimetableInfo = false;
            console.log(res);
          } //fail
        })
      }
    } //if
    else {
      wx.switchTab({
        url: '../account/account',
      })
    } //else
  },

  //事件：空教室
  touchRoomIcon: function (options) {
    console.log('Click Room')
    wx.navigateTo({
      url: '../rooms/rooms',
    })
  },

  //事件：成绩
  touchScoreIcon: function (options) {
    console.log("Click Score")

    var that = this

    //先判断用户是否登录过
    if(app.globalData.hasBaseInfo){
      wx.navigateTo({
        url: '../score/score-query',
      })
    }
    else{
      wx.switchTab({
        url: '../account/account',
      })
    }
  },

  //事件：考试
  touchExamIcon: function (options) {
    console.log("Click Exam")

    var that = this

    if (app.globalData.hasBaseInfo) {
      if (app.globalData.hasExamInfo) {
        wx.navigateTo({
          url: '/pages/exam/exam',
        });
      } 
      else {
        wx.showLoading({
          title: '考试信息查询中...',
        })
        wx.request({
          url: app.data.url_crawler + 'examination',
          method: 'POST',
          data: {
            xh: that.globalData.account,
            mm: that.globalData.password,
            vpn_pwd: that.globalData.passwordVpn
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            if (res.statusCode == 200) {
              wx.setStorage({
                key: app.data.keyExamInfo,
                data: res.data,
              })
              app.globalData.hasExamInfo = true;
              wx.hideLoading()
              wx.navigateTo({
                url: '/pages/exam/exam',
              });
            } 
            else {
              wx.hideLoading()
              app.globalData.hasExamInfo = false;
              wx.showToast({
                title: '查询失败...',
                icon: 'none'
              })
            }
          },
          fail: function (res) {
            console.log("请求考试信息出错:" + res)
            app.globalData.hasExamInfo = false;
          }
        });
      }
    } 
    else {
      wx.switchTab({
        url: '../account/account',
      })
    }
  },

  //事件：CET(等级考试)
  touchCetIcon: function (options) {
    console.log("Click CET")

    var that = this

    //先判断用户是否登录过
    if (app.globalData.hasBaseInfo) {
      if (app.globalData.hasCetInfo) {
        wx.navigateTo({
          url: '../cet/cet',
        })
      } 
      else {
        wx.showLoading({
          title: 'CET成绩查询中...',
        })
        wx.request({
          url: app.data.url_crawler + 'cet',
          method: 'POST',
          data: {
            xh: that.globalData.account,
            mm: that.globalData.password,
            vpn_pwd: that.globalData.passwordVpn
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
              })
            } 
            else {
              wx.hideLoading()
              app.globalData.hasCetInfo = false
              wx.showToast({
                title: '查询失败...',
                icon: 'none'
              })
            }
          },
          fail: function (res) {
            console.log('登录失败')
            app.globalData.hasCetInfo = false
          }
        });
      }
    } //if
    else {
      wx.switchTab({
        url: '../account/account',
      })
    } //else
  },

  //事件：地点查询
  touchLocationIcon: function(options) {
    console.log("Click Loaction query")

    wx.navigateTo({
      url: '/pages/navi/navi',
    })
  },

  //事件：电话查询
  touchTelephoneIcon: function(options) {
    console.log("Click Telephone query")

    wx.navigateTo({
      url: '/pages/phone/phone',
    })
  },

  //事件：同学须知
  touchNoticeIcon: function(options) {
    console.log("Click Notice")
    
    wx.navigateTo({
      url: '/pages/qa/qa',
    })
  },
  
  onLoad: function () {
    // this.updataData()
    // console.log("onLoad ~ pages/index ~ 请求轮播图数据")

    var currentWeek = app.globalData.currentWeek;

    this.setData({
      currentweek: currentWeek
    });
  },

  //获取当前周的课表(最新学期)
  showTodayTimeTable:function(){
    var that = this

    //将前一天的课程数据清除
    that.data.todayTimeTable = []
    that.data.currentWeekTable = []
    that.data.currentDayTable = []

    //获取当前周的数据(最新学期)
    timeTable.query_table('2019-2020', '2')
    if (app.globalData.hasTimetableInfo) {
      const localTimeTable = wx.getStorageSync(app.data.keyTimetable);
      if (localTimeTable) {
        this.data.currentWeekTable = timeTable.showTimetableByCurrentWeek(localTimeTable)
        //统计最新学期当天的课表
        this.currentTimeTable()
      }
      else {
        console.log("获取 xn=2019-2020&xq=2 课表失败")
      }
    }
  },

  //统计当天的课表(最新学期)
  currentTimeTable:function(){
    var currentWeekTable = this.data.currentWeekTable
    var currentDay = new Date().getDay();
    if(currentDay==0){
      currentDay = 7;
    }

    console.log("今天是周" + currentDay)
    //将一周中属于今天的课表压入当天的课表数组currentDayTable
    for (var i = 0; i < currentWeekTable.length; i++){
      if (currentWeekTable[i].week == currentDay){
        this.data.currentDayTable.push(currentWeekTable[i])
      }

      var currentWeekday = ''

      if (currentDay == 1)
        currentWeekday = '一'
      if (currentDay == 2)
        currentWeekday = '二'
      if (currentDay == 3)
        currentWeekday = '三'
      if (currentDay == 4)
        currentWeekday = '四'
      if (currentDay == 5)
        currentWeekday = '五'
      if (currentDay == 6)
        currentWeekday = '六'
      if (currentDay == 7)
        currentWeekday = '日'

      this.setData({
        currentDay: currentDay,
        currentWeekday: currentWeekday
      })
    } //for

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
    } //for

    // //处理当天课表中180分钟的大课，将其合并为节数为4的大课
    // var todayTimeTable = this.data.todayTimeTable
    // for (var i = 0; i < todayTimeTable.length && todayTimeTable.length>=2; i++){
    //   if (i + 1 < todayTimeTable.length){
    //   if(todayTimeTable[i].lessonName==todayTimeTable[i+1].lessonName){
    //     todayTimeTable[i].lessonEndTime = todayTimeTable[i+1].lessonEndTime
    //     todayTimeTable.splice(i+1,1)
    //     todayTimeTable[i].time = todayTimeTable[i].lessonStartTime + "~" + todayTimeTable[i].lessonEndTime + "节";
    //   }
    //   }
    // }

    // this.data.todayTimeTable = todayTimeTable

    //今天有课
    if(this.data.todayTimeTable.length!=0){
      this.setData({
        todayHaveClass: true  //标记为有课
      })
      console.log("今天有课，展示如下")
      console.log(this.data.todayTimeTable)
      //显示距离当前时间最近的一节课
      this.showNearestTimeTable();
    } //if
    else{
      this.setData({
        todayHaveClass: false  //标记为没有课
      })
    } //else
  },

  //显示距离当前时间最近的一节课
  showNearestTimeTable:function(){
    var that = this
    var todayTimeTable = that.data.todayTimeTable;

    //通州校区和本部校区的上课时间不一致，根据学号判断校区，然后分别处理
    var account = that.globalData.account
    console.log("账号为")
    console.log(account)
   // account = '19041527'
    var top2 = account.substr(0,2)
    // console.log("学号前两位数字")
    // console.log(top2)
    var collegeCode = account.substr(2,2)  //学号中的第3、4位数字代表学院代码
    // console.log("学院代码|05~环能")  
    // console.log(collegeCode + "   环能学院大一在本部上课")

    //对获取到的当前时间对照上课时间进行判断,返回当前时间所对应的节数
    //通州校区 ~ 暂时不处理部分大一就在本部上课的菜鸟
    var nodeNumber
    if(top2>='19' && collegeCode!='05'){
      // console.log("通州校区")
      nodeNumber = that.returnCurrentTimeCorrespondingNodeNumber_tz(); //通州校区
      // console.log("当前时间对应的节数")
      // console.log(nodeNumber)
      //根据返回的节数，判断距离当前时间最近的一节课
      that.updateByNodeNumber_tz(nodeNumber)
    }
    else{  //本部
      // console.log("本部校区")
      nodeNumber = that.returnCurrentTimeCorrespondingNodeNumber_cy(); //朝阳校区
      // console.log("当前时间对应的节数")
      // console.log(nodeNumber)
      //根据返回的节数，判断距离当前时间最近的一节课
      that.updateByNodeNumber_cy(nodeNumber)
    }
    
    // console.log("最终结果")
    // console.log(that.data.nearestTimeTable)
    
    that.setData({
      nearestTimeTable: that.data.nearestTimeTable
    })
  },

  //根据返回的节数，判断距离当前时间最近的一节课 朝阳校区~cy
  updateByNodeNumber_cy:function(nodeNumber){
    var that = this
    var todayTimeTable = that.data.todayTimeTable;

    var flag = -1;
    for (var i = 0; i < todayTimeTable.length; i++) {
      if (nodeNumber < todayTimeTable[i].lessonStartTime) {
        that.data.nearestTimeTable[0] = todayTimeTable[i];
        flag = 1;
        break;
      }
    }

    //如果当天课表中有距离目前时间最近的一节课
    if (flag == 1) {
      console.log('距离当前时间最近的一节课')
      console.log(that.data.nearestTimeTable)
      var time = '';  //上课时间
      //将节数转换为对应的时间
      //4小节组成的一节课
      if (that.data.nearestTimeTable[0].lessonEndTime - that.data.nearestTimeTable[0].lessonStartTime == 3) {
        switch (that.data.nearestTimeTable[0].lessonStartTime) {
          case 1:
            time = '8:00~11:30';
            break;
          case 5:
            time = '13:30~17:00';
            break;
          case 9:
            time = '18:00~21:30';
            break;
          default: break;
        }
      }

      //2小节组成的一节课
      if (that.data.nearestTimeTable[0].lessonEndTime - that.data.nearestTimeTable[0].lessonStartTime == 1) {
        switch (that.data.nearestTimeTable[0].lessonStartTime) {
          case 1:
            time = '8:00~9.35';
            break;
          case 3:
            time = '9:55~11.30';
            break;
          case 5:
            time = '13:30~15:05';
            break;
          case 7:
            time = '15:25~17:00';
            break;
          case 9:
            time = '18:00~19:35';
            break;
          case 11:
            time = '19:55~21:30';
            break;
          default: break;
        }
      }

      if (time != '') {
        that.data.nearestTimeTable[0].time = time;
      }
    } //if
    else {
      // this.data.nearestTimeTable = "今天的课上完啦"
      that.setData({
        todayFinishClass: true   //标记今天的课上完了
      })
    } //else
  },

  //根据返回的节数，判断距离当前时间最近的一节课 通州校区~tz
  updateByNodeNumber_tz: function (nodeNumber) {
    var that = this
    var todayTimeTable = that.data.todayTimeTable;

    var flag = -1;
    for (var i = 0; i < todayTimeTable.length; i++) {
      if (nodeNumber < todayTimeTable[i].lessonStartTime) {
        that.data.nearestTimeTable[0] = todayTimeTable[i];
        flag = 1;
        break;
      }
    }

    //如果当天课表中有距离目前时间最近的一节课
    if (flag == 1) {
      console.log('距离当前时间最近的一节课')
      console.log(that.data.nearestTimeTable)
      var time = '';  //上课时间
      //将节数转换为对应的时间
      //4小节组成的一节课
      if (that.data.nearestTimeTable[0].lessonEndTime - that.data.nearestTimeTable[0].lessonStartTime == 3) {
        switch (that.data.nearestTimeTable[0].lessonStartTime) {
          case 1:
            time = '8:30~12:00';
            break;
          case 5:
            time = '13:30~17:00';
            break;
          case 9:
            time = '18:00~21:20';
            break;
          default: break;
        }
      }

      //2小节组成的一节课
      if (that.data.nearestTimeTable[0].lessonEndTime - that.data.nearestTimeTable[0].lessonStartTime == 1) {
        switch (that.data.nearestTimeTable[0].lessonStartTime) {
          case 1:
            time = '8:30~10:05';
            break;
          case 3:
            time = '10:25~12:00';
            break;
          case 5:
            time = '13:30~15:05';
            break;
          case 7:
            time = '15:25~17:00';
            break;
          case 9:
            time = '18:00~19:35';
            break;
          case 11:
            time = '19:45~21:20';
            break;
          default: break;
        }
      }

      if (time != '') {
        that.data.nearestTimeTable[0].time = time;
      }
    }
    else {
      // this.data.nearestTimeTable = "今天的课上完啦"
      that.setData({
        todayFinishClass: true   //标记今天的课上完了
      })
    }
  },

  //对获取到的当前时间对照上课时间进行判断 - 朝阳校区~cy
  //这个函数返回一个数字，（代表当前时间对应的课表节数）
  returnCurrentTimeCorrespondingNodeNumber_cy:function(){
    var mytime = timeFormat.formatTimeOfTimeTable(new Date());     //获取当前时间并格式化为24小时制
    console.log("当前时间")
    console.log(mytime)

    if(mytime < '08:00:00') return 0
    else if( mytime < "09:55:00") return 2.5
    else if( mytime < "13:30:00") return 4.5
    else if( mytime < "15:25:00") return 6.5
    else if( mytime < "18:00:00") return 8.5
    else if( mytime < "19:55:00") return 10.5
  },

  //对获取到的当前时间对照上课时间进行判断 - 通州校区~tz
  //这个函数返回一个数字，（代表当前时间对应的课表节数）
  returnCurrentTimeCorrespondingNodeNumber_tz: function (){
    var mytime = timeFormat.formatTimeOfTimeTable(new Date());     //获取当前时间并格式化为24小时制
    console.log("当前时间")
    console.log(mytime)

    if (mytime < '08:30:00') return 0
    else if (mytime < "10:25:00") return 2.5
    else if (mytime < "13:30:00") return 4.5
    else if (mytime < "15:25:00") return 6.5
    else if (mytime < "18:00:00") return 8.5
    else if (mytime < "19:45:00") return 10.5
  },

  // //更新轮播图通告
  // onHide: function (){
  //   this.updataData()
  //   console.log("onHide ~ pages/index ~ 更新轮播图数据")
  // },

  // //更新轮播图通告
  // updataData: function(){
  //   var limit = 4 //加载4篇轮播图文章
  //   var lastid = 0
  //   var that = this

  //   wx.request({
  //     url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Imagetitle/Imagetitle/getImagetitle',
  //     data: { lastid: lastid, limit: limit },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success(res) {
  //       that.setData({ imgUrls: res.data })
  //     },
  //     fail: function (res) {
  //       console.log("服务器开小差了...")
  //     }
  //   })
  // },




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
    this.globalData.passwordVpn = wx.getStorageSync(app.data.keyPwdVpn)
    
    //显示当天课表（内含显示离当前时间最近的一节课）
    this.showTodayTimeTable()
  }
}) //Page
