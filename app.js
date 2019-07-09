//app.js

App({
  data: {
    //课表
    keyTimetable: 'timetableLcocal',            //用于存取本地存储的课程信息的键
    keyExerciseLesson: 'exerciseLessonLocal',        //用于存取实践课的键
    keyUserName: 'studentNumLocal',              //用于存取学生学号的键
    keyPwd: 'stuPwdLocal',                      //用于存取学生密码的键
    keyInfo: 'stuInfoLocal',                           //用于存取学生基本信息的键
    keyCet: 'cetLocal',                          //用于存取四六级考试成绩的键
    keyPhoneList: 'phoneLocal',                 //用于存取电话号码的键,
    keyPhoneSort: 'phoneSortLocal',             //存取电话分类的键
    keyQaList: 'qaLocal',                        //用于存取知识库的键
    keyExamInfo: 'examInfoLocal',                //用于存取考试信息的键
    url: 'https://www.bjutxiaomei.cn/index.php?s=/'
  },
  globalData: {
    userInfo: null,
    type: null,             //文章类型
    label: null,             //电话分类
    username: null,           //学号
    userpassword: null,       //教务密码
    classification: '',     //文章分类
    freeRooms: [],          //空教室
    currentWeek: null,        //当前是第几周
    hasTimetableInfo: false,       //用于判断本地有没有缓存的课表信息
    hasExamInfo: false,         //用于判断本地有没有缓存的考试信息
    hasCetInfo:false,        //用于判断本地有没有缓存的CET信息
    hasBaseInfo:false,          //用于判断学生是否已经登录过
    time : 0,
    touchDot : 0,//触摸时的原点
    touchDoty : 0,
    interval : "",
    flag_hd : true
  },

  //版本更新检查
  updataVersion: function () {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    // 新的版本下载失败
    updateManager.onUpdateFailed(function () {
      wx.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索工大小美后打开呦 ',
      })
    })
  },

  onLaunch: function () {
    
    //尝试获取新版本
    this.updataVersion()

    //从缓存中获取用户信息
    console.log("从缓存中获取用户信息")
    var username = wx.getStorageSync(this.data.keyUserName)
    var userpassword = wx.getStorageSync(this.data.keyPwd)

    //判断是否有各种信息缓存
    this.ensureLogined();
    this.ensureHasCetInfo();
    this.ensureHasExamInfo();
    this.ensureHasTimetableInfo();  

    //计算全局变量currentWeek
    this.calculateCurrentWeek();
    this.globalData.username = username
    this.globalData.userpassword = userpassword
    

    wx.getSystemInfo({
      success(res) {
        console.log(res.windowHeight)
      }
    })

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
              url: that.data.url + 'addon/Cms/Cms/sendCode',
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
                      url: that.data.url + 'addon/Cms/Cms/saveUserInfo',
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

  //检测本地是否存有学生个人信息数据
  ensureLogined:function(){
    var temp = wx.getStorageSync(this.data.keyInfo);
    if(temp){
      this.globalData.hasBaseInfo = true;
    }
  },

  /**
   * 检测本地是否存有课表数据、等级考试数据、考试信息数据
   */
  ensureHasTimetableInfo: function () {
    var timeTable = wx.getStorageSync(this.data.keyTimetable)
    //如果读到username，证明有本地数据，将hasTimetableInfo置为true
    if (timeTable) {
      this.globalData.hasTimetableInfo = true
    } else {
      this.globalData.hasTimetableInfo = false
    }
  },
  /**
   * 确保本地是否有四六级考试信息
   */
  ensureHasCetInfo:function(){
    var cet = wx.getStorageSync(this.data.keyCet)
    if(cet){
      this.globalData.hasCetInfo = true;
    }else{
      this.globalData.hasCetInfo = false;
    }
  },
  /**
   *确保本地是否有考试信息
   */
  ensureHasExamInfo:function(){
    var exam = wx.getStorageSync(this.data.keyExamInfo);
    if (exam) {
      this.globalData.hasExamInfo = true;
    } else {
      this.globalData.hasExamInfo = false;
    }
  },
  /**
 * 退出登录后，将课表信息、考试信息、四六级考试的变量转为false
 */
  logout: function () {
    this.globalData.hasCetInfo = false;
    this.globalData.hasTimetableInfo = false;
    this.globalData.hasBaseInfo = false;
    this.globalData.hasExamInfo = false;
  },

  /**解析课程表(不含实践课处理)
   * 将从教务获取的课程表数据解析成能够在课程表展示的数据
   * 每节课时长均按90分钟计算。如果某节课时长180分钟，拆成两节课。
   * 同一个时间段如果存在多节课，则将课程数量以角标形式置于右下角。
   * 例如：周三3、4节在一至八周是课程一，在九至十六周是课程二，则显示全部课表时，周三3、4节加角标'2'.
   */
  parseTimetableData: function (res) {
    console.log("解析前课表数据")
    // console.log(JSON.parse(JSON.stringify(res)))
    var that = this;
    var lessonWeekDay;   //课程在一周中的周几
    var lessonStart;   //课程开始的节数
    var lessonNum;   //课程节数（课表最小单元格）
    var lessonNameAndLocationAndTeacher;  //课程名称、上课地点、老师
    var lessonTime;  //课程起始周（例：1-16周）
    var list = [];

    //遍历列表，处理数据：将原始课表信息处理为我们需要的格式list
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

      //处理location
      // var end = res[i].Location.indexOf("(");
      // res[i].Location = res[i].Location.slice(0,end);
      lessonNameAndLocationAndTeacher = res[i].Name + '\n' + res[i].Teacher + '\n' + '@' + res[i].Location + '@' + lessonTime + '';
      
      //将处理好的数据压入list
      list.push({
      "week": lessonWeekDay,  //周几
      "start": lessonStart,   //课程开始节数
      "lessonNum": lessonNum,  //课程节数
      "kcmc": lessonNameAndLocationAndTeacher,  //课程详细信息
      "tag": 1
      })

    }  //for

    //判断同一时段是否有重叠课程，若有，则tag++
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

      that.saveTimetableToLocal(list)
      console.log("解析后课表数据")
      // console.log(list)
      return list
    }
  },

  //将time字段的汉字数字变成数字   周一 => 周1
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

  /**
   * 根据开学时间，计算当前时间属于第几周
   */
  calculateCurrentWeek: function () {
    // var semesterStartDate = new Date('2019/02/18 00:00:00');
    var semesterStartDate = new Date('2019/07/01 00:00:00')
    console.log("开学时间")
    console.log(semesterStartDate)
    var currentDate = new Date();
    var interval = parseFloat(currentDate - semesterStartDate);
    var weekNow = 0;
    var days = interval / 1000 / 60 / 60 / 24;
    if ((days % 7) != 0) {
      weekNow = days / 7 + 1;
    } else {
      weekNow = days / 7;
    }
    this.globalData.currentWeek = parseInt(weekNow)
  }
})