const app = getApp()
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

  /**
   * 处理学年选择器
   */
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
  /**
   * 处理学期选择器
   */
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

  /**
    * 处理点击查询按钮事件
    */
  queryBtn: function () {
    wx.showLoading({
      title: '成绩查询中...',
    })
    var account = wx.getStorageSync(app.data.keyUserName)
    var pwd = wx.getStorageSync(app.data.keyPwd)
    var year = this.data.pickedYear
    var semester = this.data.pickedSemester

    console.log('year: ' + year + "semester: " + semester)
   
    //检测学号，密码，学年，学期是否正确
    if(year != '' && semester !=''){
      wx.request({
        url: 'https://www.bjut1960.cn/score',
        method:'POST',
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
          console.log(res)
          if (res.statusCode == 500){
            wx.showToast({
              title: '还没出分哦...',
              icon: 'none'
            })
          }
          if (res.statusCode == 200){
            wx.navigateTo({
              url: './score-result/score-result?result=' + JSON.stringify(res.data),
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
    }else{
      wx.showToast({
        title: '输入无效,请检查...',
        icon:'none'
      })
    }
  },
 
  onLoad:function(){

    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: '考试成绩查询'
    })

    //判断用户是否登录过,如果没有登录则跳转登录页面
    const user = wx.getStorageSync(app.data.keyUserName)
    if (user == '') {
      wx.switchTab({
        url: '../account/account',
      })
    }

    this.haveLocalPickerData()
    
  },

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