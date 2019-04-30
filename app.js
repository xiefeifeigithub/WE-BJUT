//app.js

App({
  onLaunch: function () {
  
     //清理本地的所有缓存
    console.log("小程序初始化")
    //wx.clearStorage();

    //清除本地指定缓存
    wx.removeStorage({
      key: 'CmsList',
      success(res) {
        console.log(res.data)
        console.log("清除文章数据缓存")
      }
    })

    //从缓存中获取用户信息
    console.log("从缓存中获取用户信息")
    var username = wx.getStorageSync('username')
    var userpassword = wx.getStorageSync('userpassword')
    this.globalData.username = username
    this.globalData.userpassword = userpassword
    console.log(username,userpassword)

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log("app.js:" + res.code)
          if (res.code) {
            wx.request({
              url: that.url + 'addon/Cms/Cms/sendCode',
              data: {
                code: res.code,
                PHPSESSID: wx.getStorageSync('PHPSESSID')
              },
              success: function (res) {
                //缓存session_id
                wx.setStorageSync('PHPSESSID', res.data.PHPSESSID)
                wx.setStorageSync('openid', res.data.openid)

                //获取用户信息
                wx.getUserInfo({
                  success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)

                    //console.log(res);
                    wx.request({
                      url: that.url + 'addon/Cms/Cms/saveUserInfo',
                      data: {
                        encryptedData: res.encryptedData,
                        PHPSESSID: wx.getStorageSync('PHPSESSID'),
                        iv: res.iv
                      },
                      success: function (res) {
                        //console.log(res)
                      }
                    })

                  }
                })
              }
            })
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    
    type: null, //文章类型
    username: '', //学号
    userpassword: '',  //教务密码
    classification: '',  //文章分类
    freeRooms: [] //空教室
  },
  data: {
    //课表
    keyTimetable: 'timetableLcocal',        //用于获取本地存储的课程信息的键
    keyStudentName: 'studentNameLocal',     //用于获取本地存储的学生姓名的键
    keyStudentNum: 'studentNumLocal',      //用于获取本地存储的学生学号的键
    keyClassNum: 'classNum',                 //班号
    keyCollege: 'college',                   //学院
    keyMajor: 'major',                        //专业
    keyExerciseLesson: 'exerciseLesson',       //实践课

    //文章
    // keyCmsList: 'CmsList' //用于获取文章数据的键
  },
  //url: 'https://你的域名/index.php?s=/'
  url: 'https://www.bjutxiaomei.cn/index.php?s=/',

  /**
   * 检测本地是否存有课表数据
   */
  hasLocalData: function () {
    var hasData = false;
    try {
      const value = wx.getStorageSync(this.data.keyTimetable);
      if (value) {
        console.log("本地有数据");
        hasData = true;
      } else {
        hasData = false;
      }
    } catch (e) {
      console.log("获取本地数据出现异常")
      hasData = false;
    }
    return hasData;
  },
  /**解析课程表(不含实践课处理)
   * 将从教务获取的课程表数据解析成能够在课程表展示的数据
   * 每节课时长均按90分钟计算。如果某节课时长180分钟，拆成两节课。
   * 同一个时间段如果存在多节课，则将课程数量以角标形式置于右下角。
   * 例如：周三3、4节在一至八周是课程一，在九至十六周是课程二，则显示全部课表时，周三3、4节加角标'2'.
   */
  parseTimetableData: function (res) {
    var that = this;
    var lessonWeekDay;
    var lessonStart;
    var lessonNum;
    var lessonNameAndLocationAndTeacher;
    var lessonTime;
    var list = [];

    for (var i = 0; i < res.length; i++) {
      lessonWeekDay = that.numberChange(res[i].Time.charAt(1))

      if (res[i].Time.charAt(4) == ',') {
        lessonStart = parseInt(res[i].Time.charAt(3));
      } else {
        lessonStart = parseInt(res[i].Time.charAt(3) + res[i].Time.charAt(4));
      }

      var tempArr = res[i].Time.split('第', 2);
      lessonTime = res[i].Time.split('第')[2];
      var temTime = tempArr[1].split('节')[0];

      lessonNum = temTime.split(',').length;
      lessonNameAndLocationAndTeacher = res[i].Name + '\n' + res[i].Teacher + '\n' + '@' + res[i].Location + '@' + lessonTime + '';
      //对180分钟的大课进行分割，平分成两节课。
      if (lessonNum == 4) {
        list.push({
          "week": lessonWeekDay,
          "start": lessonStart,
          "lessonNum": lessonNum / 2,
          "kcmc": lessonNameAndLocationAndTeacher,
          "tag": 1
        });
        list.push({
          "week": lessonWeekDay,
          "start": lessonStart + 2,
          "lessonNum": lessonNum / 2,
          "kcmc": lessonNameAndLocationAndTeacher,
          "tag": 1
        });

      } else {
        list.push({
          "week": lessonWeekDay,
          "start": lessonStart,
          "lessonNum": lessonNum,
          "kcmc": lessonNameAndLocationAndTeacher,
          "tag": 1
        })
      }

    }

    if (list.length != 0) {
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list.length; j++) {
          if (j == i) {
            continue;
          }
          if (list[i].start == list[j].start && list[i].week == list[j].week) {
            list[i].tag++;
          }
        }
      }
      that.saveTimetableToLocal(list);
    }

    
  },
  numberChange: function (num) {
    var alb = 0
    switch (num) {
      case '一':
        alb = 1;
        break
      case '二':
        alb = 2
        break
      case '三':
        alb = 3
        break
      case '四':
        alb = 4
        break
      case '五':
        alb = 5
        break
      case '六':
        alb = 6
        break
      case '日':
        alb = 7
        break
      default:
        break;
    }
    return alb
  },
  /**
 * 将课程表数据存储到本地
 */
  saveTimetableToLocal: function (data) {
    if (data.length != 0) {
      wx.setStorageSync(this.data.keyTimetable, data);
    }
  },
})
