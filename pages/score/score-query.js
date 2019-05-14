const app = getApp()
Page({
  data: {
    yearArray:['2018-2019','2017-2018','2016-2017','2015-2016','2014-2015'],
    semesterArray:['1','2','3'],
    yearPick:false,
    semesterPick:false,
    yearIndex:0,
    semesterIndex:0
  },

  globalData:{
    pickedYear: '',
    pickedSemester: '',
  },

  /**
   * 处理学年选择器
   */
  yearPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.yearArray[e.detail.value])
    this.globalData.pickedYear = this.data.yearArray[e.detail.value]
    this.setData({
      yearIndex: e.detail.value,
      yearPick: true,
    })
  },
  /**
   * 处理学期选择器
   */
  semesterPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.semesterArray[e.detail.value])
    this.globalData.pickedSemester = this.data.semesterArray[e.detail.value]
    this.setData({
      semesterIndex: e.detail.value,
      semesterPick:true,
    })
  },

  /**
    * 处理点击查询按钮事件
    */
  queryBtn: function () {
    wx.showLoading({
      title: '请稍等...',
    })
    var account = wx.getStorageSync(app.data.keyUserName)
    var pwd = wx.getStorageSync(app.data.keyPwd)
    var year = this.globalData.pickedYear
    var semester = this.globalData.pickedSemester
   
    //检测学号，密码，学年，学期是否正确
    if(year != '' && semester !=''){
      wx.request({
        url: 'https://bjut.bjutxiaomei.cn/API.php',
        data: {
          account: account,
          password: pwd,
          current_year: year,
          current_term: semester,
          yearIndex:0,
          semesterIndex:0,
          token: 'biaogexf'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
          if (res.statusCode == 404){
            wx.showToast({
              title: '访问教务教务出错,请稍后重试',
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
  //页面初次渲染完成时触发
  onReady: function () {
    //动态设置当前页面的标题
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
  }
})