const app = getApp()
// var score = require('../../utils/score.js');
Page({
  data: {
    yearArray:['2018-2019','2017-2018','2016-2017','2015-2016','2014-2015'],
    semesterArray:['1','2','3'],
    yearPick:false,
    semesterPick:false,
    yearIndex:0,
    semesterIndex:0,
    pickedYear: '',
    pickedSemester: '',
  },

  //  处理学年选择器
  yearPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.yearArray[e.detail.value])
    this.data.pickedYear = this.data.yearArray[e.detail.value]
    this.setData({
      yearIndex: e.detail.value,
      yearPick: true,
    })

    //设置用户选择学年，学期，下标的缓存
    wx.setStorage({
      key: 'year',
      data: this.data.yearArray[e.detail.value],
    })

    wx.setStorage({
      key: 'yearIndex',
      data: e.detail.value,
    })


    wx.setStorage({
      key: 'yearPick',
      data: this.data.yearPick,
    })
  },

  // 处理学期选择器
  semesterPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.semesterArray[e.detail.value])
    this.data.pickedSemester = this.data.semesterArray[e.detail.value]
    this.setData({
      semesterIndex: e.detail.value,
      semesterPick:true,
    })

    //设置用户选择学年，学期，下标的缓存
    wx.setStorage({
      key: 'semester',
      data: this.data.semesterArray[e.detail.value],
    })

    wx.setStorage({
      key: 'semesterIndex',
      data: e.detail.value,
    })

    wx.setStorage({
      key: 'semesterPick',
      data: this.data.semesterPick,
    })
  },

  //处理点击成绩查询事件
  queryBtn: function () {
    wx.showLoading({
      title: '成绩查询中...',
    })
    var account = wx.getStorageSync(app.data.keyUserName)
    var pwd = wx.getStorageSync(app.data.keyPwd)
    var year = this.data.pickedYear
    var semester = this.data.pickedSemester

    console.log('year: ' + year + "semester: " + semester)

    
   
    //检测学年，学期是否正确
    if (year != '' && semester != '') {

      //判断本地是否有缓存，若有，直接带着缓存跳到成绩结果界面
      // var key = year + '_' + semester;
      // var localYearAndSemesterData = wx.getStorageSync(key)
      // if (localYearAndSemesterData) {
      //   console.log("带着成绩缓存私奔了")
      //   wx.navigateTo({
      //     url: './score-result/score-result?result=' + localYearAndSemesterData + '&year=' + year +  '&semester=' + semester,
      //   });
      // }
      // else {
        wx.request({
          url: 'https://www.bjut1960.cn/score',
          method: 'POST',
          data: {
            xh: account,
            mm: pwd,
            xn: year,
            xq: semester,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            if (res.statusCode == 500) {
              wx.showToast({
                title: '教务出现问题...',
                icon: 'none'
              })
            }
            if (res.statusCode == 200) {
              wx.navigateTo({
                url: './score-result/score-result?result=' + JSON.stringify(res.data) + '&year=' + year + '&semester=' + semester,
              });
            }
          },
          fail() {
            wx.showToast({
              title: '请求超时...',
              icon: 'none'
            })
          }
        })
      }
    // }
     else {
      wx.showToast({
        title: '输入无效,请检查...',
        icon: 'none'
      })
    }
  },

  //设置当前页面的标题
  onReady:function(){
    wx.setNavigationBarTitle({
      title: '考试成绩查询'
    })
  },
 
  onLoad:function(){

    //判断用户是否登录过,如果没有登录则跳转登录页面
    const user = wx.getStorageSync(app.data.keyUserName)
    if (user == '') {
      wx.switchTab({
        url: '../account/account',
      })
    }

    this.haveLocalPickerData()
  },

  // onHide:function(){
  //   console.log("onHide ~ pages/score-query")
  //   console.log("获取最新学年/学期成绩缓存")
  //   score.queryScoreBy_Year_Semester('2018-2019', '2')  //获取2018~2019年第2学期JSON字符串缓存
  // },

  //记住用户上次所选year,semester
  haveLocalPickerData: function(){
    var yearLocal = wx.getStorageSync('year')
    var semesterLocal = wx.getStorageSync('semester')
    if (yearLocal && semesterLocal) {

      var pickedYear = wx.getStorageSync('year')
      var yearIndex = wx.getStorageSync('yearIndex')
      var yearPick = wx.getStorageSync('yearPick')

      var pickedSemester = wx.getStorageSync('semester')
      var semesterIndex = wx.getStorageSync('semesterIndex')
      var semesterPick = wx.getStorageSync('semesterPick')

      this.setData({
        yearIndex: yearIndex,
        yearPick: yearPick,
        semesterIndex: semesterIndex,
        semesterPick: semesterPick,
        pickedYear: pickedYear,
        pickedSemester: pickedSemester
      })
    }
  }

})