const app = getApp()
var common = require('../../utils/common.js');

Page({
  data: {
    userName: '', //用户名
    userPwd: '', //密码
    userPwdVpn: '', //vpn密码

    info: {} ,//学生基本信息

    passwordStatus: true, //密码状态
    unload:true,  //是否加载学生个人信息
  },
  globalData:{
    timer:null
  },

  onLoad: function (options) {
    // 从缓存中获取用户信息
    var that = this
    var username = app.globalData.username

    if(username){
      this.setData({unload:false})

      var userpassword = app.globalData.userpassword
      var userpasswordVpn = app.globalData.userpasswordVpn

      var infoList = wx.getStorageSync(app.data.keyInfo)
      that.setData({
        userName: username, 
        userPwd: userpassword,
        userPwdVpn: userpasswordVpn,

        info:infoList
      })
    }
    else{
      this.setData({ unload: true })
    }
  },

  onReady: function () {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
  },

  //密码短暂显示功能
  changeStatus:function(e){
    //passwordStatus - 变可见
    this.setData({
      passwordStatus: !this.data.passwordStatus
    })
    console.log('显示密码：' + this.data.passwordStatus)

    //设置定时器 - 延时1秒
    this.globalData.timer = setTimeout(function () {
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

  // 获取用户输入的密码 password
  passWdInput: function(e) {
    this.setData({
      userPwd: e.detail.value
    })
  },

  // 获取用户输入的密码 password_vpn
  passWdVpnInput: function(e) {
    this.setData({
      userPwdVpn: e.detail.value
    })
  },

  //设置用户名和密码的缓存
  setStorage: function() {
    // 用户名
    wx.setStorage({
      key: app.data.keyUserName,
      data: this.data.userName,
    })
    // password
    wx.setStorage({
      key: app.data.keyPwd,
      data: this.data.userPwd,
    })
    // passwordVpn
    wx.setStorage({
      key: app.data.keyPwdVpn,
      data: this.data.userPwdVpn,
    })
  },

  //确认绑定
  formSubmit: function(e) {
    var account = e.detail.value.userName;
    var password = e.detail.value.password;
    var passwordVpn = e.detail.value.passwordVpn;
    
    var flag = false;
    wx.showLoading({
      title: '身份验证中...',
    })

    //点击登录按钮，获取学生基本信息，页面转换为已登录状态对应的页面
    var that = this
    //请求学生基本信息
    wx.request({
      url: app.data.url_crawler + 'baseinfo',
      method: 'POST',
      data:{
        xh:account,
        mm:password,
        vpn_pwd:passwordVpn
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.statusCode == 200) {
          //登录成功：将登录的用户名和密码存储至本地
          that.setStorage()

          that.setData({
            info: res.data
          })
          wx.setStorage({
            key: app.data.keyInfo,
            data: res.data,
          })
          that.setData({
            unload: false
          })
          wx.hideLoading(); //隐藏身份验证对话框
          app.globalData.hasBaseInfo = true;
        } 
        else {
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

  //退出登录
  logout: function(e) {
    console.log('退出登录')
    //1清除本地缓存数据
    //2跳转登录页面
    try {
      wx.removeStorageSync(app.data.keyTimetable);

      wx.removeStorageSync(app.data.keyUserName);
      wx.removeStorageSync(app.data.keyPwd);
      wx.removeStorageSync(app.data.keyPwdVpn)

      wx.removeStorageSync(app.data.keyInfo);
      wx.removeStorageSync(app.data.keyExerciseLesson);
      wx.removeStorageSync(app.data.keyCet);
      wx.removeStorageSync(app.data.keyExamInfo);

      // app.logout();
      //用户退出登录后，将标记是否有CET信息、课表信息、学生个人基本信息和专业考试信息缓存的变量置为false
      app.globalData.hasBaseInfo = false
      app.globalData.hasTimetableInfo = false
      app.globalData.hasCetInfo = false
      app.globalData.hasExamInfo = false

  //       //用户退出登录后，将标记是否有CET信息、课表信息、学生个人基本信息和专业考试信息缓存的变量置为false
  // logout: function () {
  //   this.globalData.hasCetInfo = false;
  //   this.globalData.hasTimetableInfo = false;
  //   this.globalData.hasBaseInfo = false;
  //   this.globalData.hasExamInfo = false;
  // },

      
      this.setData({
        unload: true
      })
    } 
    catch (e) {
      // Do something when catch error
      console.log(e);
      wx.showToast({
        title: '操作失败',
        icon: 'success',
        duration: 2000
      })
    }
  },

  //隐藏时，关掉定时器
  onHide:function(){
    clearTimeout(this.globalData.timer)
  },

  //点击‘清除图标’清除输入的学号
  clearUsername:function(){
    this.setData({userName:''})
  }
  
})