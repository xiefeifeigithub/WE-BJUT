// pages/account/account.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: '', //用户名
    userPwd: '', //密码
    info: {} ,//学生基本信息
    passwordStatus: 'true', //密码状态
    unload:'true'  //是否加载学生个人信息
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

  //清空用户名
  clearusername: function(e) {
    this.setData({
      userName: ''
    })
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
    // username: '', //学号
    wx.setStorageSync("username", this.data.userName)
    wx.setStorageSync("userpassword", this.data.userPwd)
    console.log("用户名：" + this.data.userName + " 密码：" + this.data.userPwd);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onLoad：加载account页面：从缓存中获取用户名和密码")
    // 从缓存中获取用户信息
    var username = app.globalData.username
    console.log('用户名：' + username)
    var userpassword = app.globalData.userpassword
    console.log('密码：' + userpassword)
    var that = this
    that.setData({
      userName: username
    })
    that.setData({
      userPwd: userpassword
    })
    console.log(username);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: '个人中心'
    })

  },

  //确认绑定
  formSubmit: function(e) {
    console.log('设置用户名和密码的缓存')

    // 设置用户名和密码的缓存（函数调用）
    this.setStorage()

    console.log(e);
    var account = e.detail.value.userName;
    var password = encodeURIComponent(e.detail.value.password); //对密码进行编码防止特殊符号存在
    console.log('编码后的密码：' + password);
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

          wx.setStorage({
            key: 'username',
            data: that.data.userName
          })
          wx.setStorage({
            key: 'userpassword',
            data: that.data.userPwd
          })

          
          // app.globalData.username = this.data.username
          // app.globalData.userPwd = this.data.userpwd

          console.log("教务管理系统")
          console.log(res.data[0])
          that.setData({
            info: res.data[0]
          })
          that.setData({
            unload: false
          })
          console.log("info")
          console.log(that.data.info)
          console.log(res)
          console.log('登录成功');

          //登录成功 
          //1解析数据
          //2存储课表数据到本地
          //3存储当前学号到本地
          wx.setStorage({
            key: app.data.keyStudentNum,
            data: account,
          })
          wx.setStorage({
            key: app.data.keyStudentName,
            data: res.data[0].studentName,
          })
          wx.setStorage({
            key: app.data.keyClassNum,
            data: res.data[0].class,
          })
          wx.setStorage({
            key: app.data.keyCollege,
            data: res.data[0].college,
          })
          wx.setStorage({
            key: app.data.keyMajor,
            data: res.data[0].major,
          })
          wx.setStorage({
            key: app.data.keyExerciseLesson,
            data: res.data[1].exercise,
          })
          console.log(res);
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
    this.setData({
      unload: true
    })
  }
})