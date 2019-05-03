// pages/score/score-query.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yearArray:['2018-2019','2017-2018','2016-2017','2015-2016','2014-2015'],
    semesterArray:['1','2','3'],
    yearPick:false,
    semesterPick:false,
    pickedYear:'',
    pickedSemester:'',

  },

  /**
   * 处理学年选择器
   */
  yearPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.yearArray[e.detail.value])
    this.setData({
      index: e.detail.value,
      yearPick: true,
      pickedYear: this.data.yearArray[e.detail.value]
    })
  },
  /**
   * 处理学期选择器
   */
  semesterPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.semesterArray[e.detail.value])
    this.setData({
      index: e.detail.value,
      semesterPick:true,
      pickedSemester: this.data.semesterArray[e.detail.value]
    })
  },

  /**
    * 处理点击查询按钮事件
    */
  queryBtn: function () {
    var account = wx.getStorageSync(app.data.keyUserName)
    var pwd = wx.getStorageSync(app.data.keyPwd)
    var year = this.data.pickedYear
    var semester = this.data.pickedSemester
    //检测学号，密码，学年，学期是否正确
    if(year != '' && semester !=''){
      wx.request({
        url: 'https://chafen.bjut123.com/API.php',
        data: {
          account: account,
          password: pwd,
          current_year: year,
          current_term: semester,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          if (res.statusCode == 404){
            wx.showToast({
              title: '访问教务出错...',
              icon: 'none'
            })
            wx.navigateTo({
              url: './score-result/score-result?result=' + JSON.stringify(res.data),
            });
          }
          if (res.statusCode == 200){

          }
          

        },
        fail() {
          wx.showToast({
            title: '请检查网络...',
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
  }
  
})