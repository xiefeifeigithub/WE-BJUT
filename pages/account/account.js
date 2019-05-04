// pages/account/account.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: '', //用户名
    userPwd: '', //密码
    info: {} ,//学生基本信息
    passwordStatus: true, //密码状态
    unload:true  //是否加载学生个人信息
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    // 从缓存中获取用户信息
    var that = this
    var username = app.globalData.username

    if(username){
      this.setData({unload:false})
      var userpassword = app.globalData.userpassword
      var infoList = wx.getStorageSync(app.data.keyInfo)
      that.setData({
        userName: username,
        userPwd: userpassword,
        info:infoList
      })
    }else{
      this.setData({ unload: true })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: '个人中心'
    })

  },

  //密码短暂显示功能
  changeStatus:function(e)
  {
    //passwordStatus - 变可见
    this.setData({
      passwordStatus: !this.data.passwordStatus
    })
    console.log('显示密码：' + this.data.passwordStatus)

    //设置定时器 - 延时1秒
    var timer = setTimeout(function () {
      console.log("----延时1秒----");
      this.setData({
        passwordStatus: !this.data.passwordStatus
      })
      console.log('隐藏密码：' + this.data.passwordStatus)
    }.bind(this), 1000);
  },
  //获取用户输入的用户名
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  // 获取用户输入的密码
  passWdInput: function(e) {
    this.setData({
      userPwd: e.detail.value
    })
  },

  //设置用户名和密码的缓存
  setStorage: function() {
    wx.setStorageSync(app.data.keyUserName, this.data.userName)
    wx.setStorageSync(app.data.keyPwd, this.data.userPwd)
  },

  //确认绑定
  formSubmit: function(e) {
    var account = e.detail.value.userName;
    var password = encodeURIComponent(e.detail.value.password); //对密码进行编码防止特殊符号存在
    var flag = false;

    wx.showLoading({
      title: '身份验证中...',
    });

    var that = this
    wx.request({
      // https://www.bjut1960.cn/schedule?xh=学号&mm=密码
      url: 'https://www.bjut1960.cn/schedule?xh=' + account + '&mm=' + password,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {

        if (res.statusCode == 200) {
          //登录成功：将登录的用户名和密码存储至本地
          that.setStorage()
          that.setData({
            info: res.data[0]
          })
          that.setData({
            unload: false
          })
          //1解析课表数据
          //2存储课表、实践课、学生基本信息数据到本地
          wx.setStorage({
            key: app.data.keyInfo,
            data: res.data[0],
          })
          wx.setStorage({
            key: app.data.keyExerciseLesson,
            data: res.data[1].exercise,
          })
          app.parseTimetableData(res.data[1].table);
          wx.hideLoading(); //隐藏身份验证对话框

        } else {
          wx.showToast({
            title: '请检查学号或密码是否正确',
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        console.log('登录失败');
        console.log(res);
      }
    });
  },
  logout: function(e) {
    console.log('退出登录')
    //1清除本地缓存数据
    //2跳转登录页面
    try {
      wx.removeStorageSync(app.data.keyTimetable);
      wx.removeStorageSync(app.data.keyUserName);
      wx.removeStorageSync(app.data.keyPwd);
      wx.removeStorageSync(app.data.keyInfo);
      wx.removeStorageSync(app.data.keyExerciseLesson);
      this.setData({
        unload: true
      })
    } catch (e) {
      // Do something when catch error
      console.log(e);
      wx.showToast({
        title: '操作失败',
        icon: 'success',
        duration: 2000
      })
    }

  }
})