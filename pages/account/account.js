const app = getApp()
var common = require('../../utils/common.js');

Page({
  data: {
    userName: '', //用户名
    userPwd: '', //密码
    info: {} ,//学生基本信息
    passwordStatus: true, //密码状态
    unload:true,  //是否加载学生个人信息
  },
  globalData:{
    timer:null
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


  // 生命周期函数--监听页面初次渲染完成
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
  // 获取用户输入的密码
  passWdInput: function(e) {
    this.setData({
      userPwd: e.detail.value
    })
  },

  //设置用户名和密码的缓存
  setStorage: function() {
    wx.setStorage({
      key: app.data.keyUserName,
      data: this.data.userName,
    })
    wx.setStorage({
      key: app.data.keyPwd,
      data: this.data.userPwd,
    })
  },

  //确认绑定
  formSubmit: function(e) {
    var account = e.detail.value.userName;
    var password = e.detail.value.password;
    var flag = false;

    wx.showLoading({
      title: '身份验证中...',
    });
    //点击登录按钮，获取学生基本信息，页面转换为已登录状态对应的页面
    var that = this
    //请求学生基本信息
    wx.request({
      url: 'https://www.bjut1960.cn/baseinfo',
      method: 'POST',
      data:{
        xh:account,
        mm:password
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
      wx.removeStorageSync(app.data.keyCet);
      wx.removeStorageSync(app.data.keyExamInfo);
      app.logout();
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