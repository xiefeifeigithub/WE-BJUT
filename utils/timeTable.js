var app = getApp()

function query_table(year, semester) {
  var tempList = [];
  console.log("向服务器获取" + year + "年第" + semester + "学期的课表")
  var account = wx.getStorageSync(app.data.keyUserName)
  var pwd = wx.getStorageSync(app.data.keyPwd)
  wx.request({
    url: 'https://www.bjut1960.cn/schedule',
    method: 'POST',
    data: {
      xh: account,
      mm: pwd,
      xn: year,
      xq: semester
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      console.log("课表接口")
      // console.log(JSON.parse(JSON.stringify(res.data.table)))
      // console.log(res.data.table)
      if (res.statusCode == 200) {
        //1解析课表数据
        //2存储课表、实践课
        wx.setStorage({
          key: app.data.keyExerciseLesson,
          data: res.data.exercise
        })
        tempList = app.parseTimetableData(JSON.parse(JSON.stringify(res.data.table)))
        app.globalData.hasTimetableInfo = true
        wx.hideLoading()
        return tempList
      } else {
        wx.hideLoading()
        app.globalData.hasTimetableInfo = false;
        // wx.showToast({
        //   title: '服务器开小差啦',
        //   icon: 'none'
        // })
        console.log("服务器开小差了，获取课表失败")
      }
    },
    fail: function (res) {
      wx.hideLoading()
      console.log('获取课表失败');
      app.globalData.hasTimetableInfo = false;
      console.log(res);
    }
  })
}


//显示当前周的课表  完整的课程信息（含教师姓名，上课周）
function showTimetableByCurrentWeek(wholeLessonList){
  var currentWeek = 0
  currentWeek = app.globalData.currentWeek

  var currWeekLessons = [];

  for (var i = 0; i < wholeLessonList.length; i++) {
    var strLesson = wholeLessonList[i].kcmc.split("@");
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
    if (currentWeek >= weekStart && currentWeek <= weekEnd) {
      currWeekLessons.push(wholeLessonList[i]);
    }
  }
  return currWeekLessons
}


//暴露接口
module.exports = {
  query_table: query_table,
  showTimetableByCurrentWeek: showTimetableByCurrentWeek
}