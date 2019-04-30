//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    currList: [],            //显示的课表信息(不包含教师姓名，上课周)
    lessonName: '',           //课程名称
    teacher: '',              //授课教师
    location: '',             //上课地点
    week: '',                 //起止周
    time: '',                 //上课时间
    mutiLessons: [],           //用于记录同时段重叠的课程
    currentWeek: 0,
    allLessonsList: [],      //全部的课表信息(不包含教师姓名，上课周)
    wholeLessonList: [],      //完整的课程信息（含教师姓名，上课周）
    exerciseLesonList:[],     //实践课课程信息
    icon_lessonUrl: '../../images/icons/all_lesson.png',
    isShowAll: true
  },

  /**
    * 生命周期函数--监听页面加载
    */

  // redirectTo  switchTab
  onLoad: function (options) {
    if (this.hasLocalData() == true) {
       console.log("数据从本地获取");
       this.getTimetableFromLocal();
       this.getExerciseLessonFromLocal();
    } else {
      console.log("转到身份认证界面")
      wx.switchTab({
        url: '../account/account',
      })
    }
  },
  onReady: function () {
    this.dialog = this.selectComponent("#dialog");
  },
  //判断本地是否有数据
  hasLocalData: function () {
    var hasData = false;
    try {
      const value = wx.getStorageSync('timetableLcocal');
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

  /**
   * 从本地获取课程表数据
   */
  getTimetableFromLocal: function () {
    var localData = [];
    var that = this;

    try {
      console.log("从课表页读取课表数据");
      const value = wx.getStorageSync(app.data.keyTimetable);
      if (value) {
        localData = value;
        //将本地读取的数据保存到wholeLessonList
        that.setData({ wholeLessonList: localData });
        that.setLessonListSimple(that.data.wholeLessonList);
      }
    } catch (e) {
      console.log("获取本地课表数据出现异常")
    }
  },

  getExerciseLessonFromLocal:function(){
    var localData = [];
    var that = this;

    try {
      console.log("从课表页读取实践课数据");
      const value = wx.getStorageSync(app.data.keyExerciseLesson);
      if (value) {
        localData = value;
        that.setData({ exerciseLesonList: localData });
      }
    } catch (e) {
      console.log("获取本地实践课出现异常")
    }
  },
  /**
   * 点击课程显示课表详情的对话框
   */
  showDialog(options) {
    var that = this;
    var lessonStart = that.data.currList[options.currentTarget.id].start;
    var lessonNum = that.data.currList[options.currentTarget.id].lessonNum;
    var lessonTimeArr = that.getLessonTime(lessonStart, lessonNum).split('|');
    var index = parseInt(options.currentTarget.id);
    var lessonName = '';
    var teacher = '';
    var location = '';
    var week = '';
    var time = '';
    var tempList2 = [];
    var thatCurrList = this.data.currList;
    var thatWholeList = this.data.wholeLessonList;
    var thatIsShowAll = this.data.isShowAll;
    var thatAllList = this.data.allLessonsList;
    var sortList = [];    //用于存储根据开始周排序的课程，针对重叠的课。
    //判断当前课表页面是显示全部还是显示本周课表
    if (!thatIsShowAll) {
      for (var i = 0; i < thatAllList.length; i++) {
        if (thatAllList[i].week == thatCurrList[index].week && thatAllList[i].start == thatCurrList[index].start && thatAllList[i].kcmc == thatCurrList[index].kcmc) {
          index = i;
          break;
        }
      }

      var tempStrArr1 = thatWholeList[index].kcmc.split('\n');
      lessonName = tempStrArr1[0];
      teacher = tempStrArr1[1];
      var tempStrArr2 = tempStrArr1[2].split('@');
      location = tempStrArr2[1];
      week = tempStrArr2[2];
      time = lessonTimeArr[0] + '-' + lessonTimeArr[1];
      tempList2.push({
        "lessonName": lessonName,
        "teacher": teacher,
        "location": location,
        "week": week,
        "time": time
      });
      this.setData({ mutiLessons:tempList2 });
    } else {
      var tempStrArr1 = thatWholeList[index].kcmc.split('\n');
      lessonName = tempStrArr1[0];
      teacher = tempStrArr1[1];
      var tempStrArr2 = tempStrArr1[2].split('@');
      location = tempStrArr2[1];
      week = tempStrArr2[2];
      time = lessonTimeArr[0] + '-' + lessonTimeArr[1];
      for (var i = 0; i < thatWholeList.length; i++) {
        if (thatCurrList[i].start == thatCurrList[index].start && thatCurrList[i].week == thatCurrList[index].week) {
          lessonStart = that.data.currList[i].start;
          lessonNum = that.data.currList[i].lessonNum;
          lessonTimeArr = that.getLessonTime(lessonStart, lessonNum).split('|');
          tempStrArr1 = that.data.wholeLessonList[i].kcmc.split('\n');
          lessonName = tempStrArr1[0];
          teacher = tempStrArr1[1];

          tempStrArr2 = tempStrArr1[2].split('@');
          location = tempStrArr2[1];
          week = tempStrArr2[2];
          time = lessonTimeArr[0] + '-' + lessonTimeArr[1];
          tempList2.push({
            "lessonName": lessonName,
            "teacher": teacher,
            "location": location,
            "week": week,
            "time": time
          });
        }
      }
      for(var i = 0; i < tempList2.length;i++){
        var startWeek = 0;
        var tempStartWeek = tempList2[i].week.substr(0,2);
        if(tempStartWeek[1] == '-'){
          startWeek = parseInt(tempStartWeek[0]);
        }else{
          startWeek = parseInt(tempStartWeek);
        }
        sortList.push({
          "lessonName":tempList2[i].lessonName,
          "teacher": tempList2[i].teacher,
          "location": tempList2[i].location,
          "week": tempList2[i].week,
          "time": tempList2[i].time,
          "startWeek":startWeek
        });
      }
      sortList.sort(this.sortStartWeek)
      this.setData({ mutiLessons: sortList });
    }

    
    this.dialog.showDialog();
  },
  sortStartWeek:function(lesson1,lesson2){
    return lesson1.startWeek-lesson2.startWeek;
  },
  /**
   * 获取某节课的起始时间和结束时间
   * start：开始的那节课，num:课程小节数
   */
  getLessonTime: function (start, num) {
    var startTime = new Date()
    var interval = 0
    switch (start) {
      case 1:
        startTime.setHours(8)
        startTime.setMinutes(0)
        break;
      case 3:
        startTime.setHours(9)
        startTime.setMinutes(55)
        break;
      case 5:
        startTime.setHours(13)
        startTime.setMinutes(30)
        break;
      case 7:
        startTime.setHours(15)
        startTime.setMinutes(25)
        break;
      case 9:
        startTime.setHours(18)
        startTime.setMinutes(0)
        break;
      case 11:
        startTime.setHours(19)
        startTime.setMinutes(55)
        break;
      default:
        break;
    }

    switch (num) {
      case 2:
        interval = 1000 * 60 * 95
        break;
      default:
        break;
    }
    var endTime = new Date(startTime.getTime() + interval)
    var startTimeMinutes = ''
    var endTimeMinutes = ''
    var startTimeHour = ''
    var endTimeHour = ''
    if (startTime.getHours() < 10) {
      startTimeHour = '0' + startTime.getHours()
    } else {
      startTimeHour = '' + startTime.getHours()
    }

    if (endTime.getHours() < 10) {
      endTimeHour = '0' + endTime.getHours()
    } else {
      endTimeHour = '' + endTime.getHours()
    }

    if (startTime.getMinutes() == 0) {
      startTimeMinutes = "00"
    } else if (startTime.getMinutes() > 0 && startTime.getMinutes() < 10) {
      startTimeMinutes = '0' + startTime.getMinutes()
    } else {
      startTimeMinutes = '' + startTime.getMinutes()
    }

    if (endTime.getMinutes() == 0) {
      endTimeMinutes = "00"
    } else if (endTime.getMinutes() > 0 && endTime.getMinutes() < 10) {
      endTimeMinutes = '0' + endTime.getMinutes()
    } else {
      endTimeMinutes = '' + endTime.getMinutes()
    }
    var tempTimeStr = "" + startTimeHour + ":" + startTimeMinutes + "|" + endTimeHour + ":" + endTimeMinutes
    return tempTimeStr;
  },

  showTimetableByCurrentWeek: function () {
    var semesterStartDate = new Date('2019/02/18 00:00:00');
    //semesterStartDate.setFullYear(2019,1,18,0);
    var currentDate = new Date();
    var interval = parseFloat(currentDate - semesterStartDate);
    var weekNow = 0;
    var days = interval / 1000 / 60 / 60 / 24;
    if ((days % 7) != 0) {
      weekNow = days / 7 + 1;
    } else {
      weekNow = days / 7;
    }

    this.setData({ currentWeek: parseInt(weekNow) })
    //this.getTimetableFromLocal();

    var currWeekLessons = [];

    for (var i = 0; i < this.data.wholeLessonList.length; i++) {
      var strLesson = this.data.wholeLessonList[i].kcmc.split("@");
      var gap1 = strLesson[2].indexOf('-');
      var gap2 = strLesson[2].indexOf('周');
      var weekStart = 0;
      var weekEnd = 0;
      //如果起始周是两位数
      if (gap1 == 2) {
        weekStart = parseInt(strLesson[2].charAt(0)) * 10 + parseInt(strLesson[2].charAt(1));
      } else {
        weekStart = parseInt(strLesson[2].charAt(0));
      }
      //如果结束周为两位数
      if ((gap2 - gap1) == 3) {
        weekEnd = parseInt(strLesson[2].charAt(gap2 - 2)) * 10 + parseInt(strLesson[2].charAt(gap2 - 1));
      } else {
        weekEnd = parseInt(strLesson[2].charAt(gap2 - 1));
      }
      if (this.data.currentWeek >= weekStart && this.data.currentWeek <= weekEnd) {
        currWeekLessons.push(this.data.wholeLessonList[i]);
      }
    }
    this.setLessonListSimple(currWeekLessons);
  },

  //处理点击显示本周课表按键
  currWeekLesson: function () {
    console.log("激发currWeekLesson");
    this.showTimetableByCurrentWeek();
  },

  /**
   * 简化课表数据，将展示的数据省略老师和上课周
   * tempList:详细的课表信息
   */
  setLessonListSimple: function (tempList) {
    var lessonName = '';
    var teacher = '';
    var location = '';
    var week = '';
    var list = [];

    for (var i = 0; i < tempList.length; i++) {
      var tempStrArr1 = tempList[i].kcmc.split('\n');
      lessonName = tempStrArr1[0] + '\n';
      var tempStrArr2 = tempStrArr1[2].split('@');
      location = '@' + tempStrArr2[1];
      list.push({
        "week": tempList[i].week,
        "start": tempList[i].start,
        "lessonNum": tempList[i].lessonNum,
        "kcmc": lessonName + location,
        "tag": tempList[i].tag
      })
    }
    this.setData({ currList: list })
    if (this.data.allLessonsList.length == 0) {
      this.setData({ allLessonsList: list })
    }
    console.log("简化数据：" + list.length);
  },
  /**
   * 显示所有课表，如果时间重叠，用角标标注
   */
  showTimetableByAll: function () {
    var tempList = this.data.allLessonsList;
    console.log("showTimetableByAll--listSize:" + tempList.length);
    this.setData({ currList: tempList });
  },
  /**
   * 点击悬浮按钮显示全部或者本周课表
   */
  showAllOrPart: function () {
    if (this.data.isShowAll == true) {
      this.setData({ isShowAll: false, icon_lessonUrl: '../../images/icons/part_lesson.png' });
      this.showTimetableByCurrentWeek();
    } else {
      this.setData({ isShowAll: true, icon_lessonUrl: '../../images/icons/all_lesson.png' });
      this.showTimetableByAll();
    }
  }
})