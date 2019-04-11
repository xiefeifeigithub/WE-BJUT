//app.js

App({
  onLaunch: function () {

    // //清理本地的所有缓存
     wx.clearStorage();

    //清除本地指定缓存
    wx.removeStorage({
      key: 'CmsList',
      success(res) {
        console.log(res.data)
        console.log("aaaaaaaaaaaaaaaa")
      }
    })

    //从缓存中获取用户信息
    var username = wx.getStorageSync('username')
    var userpassword = wx.getStorageSync('userpassword')
    this.globalData.username = username
    this.globalData.userpassword = userpassword
    console.log(username,userpassword)
    // if (username && userpassword) {
    //   that.setData({ userName: username })
    //   that.setData({ userPwd: userpassword })
    // }

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log("app.js:" + res.code)
          if (res.code) {
            wx.request({
              url: that.url + 'addon/Cms/Cms/sendCode',
              data: {
                code: res.code,
                PHPSESSID: wx.getStorageSync('PHPSESSID')
              },
              success: function (res) {
                //缓存session_id
                wx.setStorageSync('PHPSESSID', res.data.PHPSESSID)
                wx.setStorageSync('openid', res.data.openid)

                //获取用户信息
                wx.getUserInfo({
                  success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)

                    //console.log(res);
                    wx.request({
                      url: that.url + 'addon/Cms/Cms/saveUserInfo',
                      data: {
                        encryptedData: res.encryptedData,
                        PHPSESSID: wx.getStorageSync('PHPSESSID'),
                        iv: res.iv
                      },
                      success: function (res) {
                        //console.log(res)
                      }
                    })

                  }
                })
              }
            })
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    type: null, //文章类型
    username: '', //学号
    userpassword: '',  //教务密码
    classification: ''  //文章分类
  },
  //url: 'https://你的域名/index.php?s=/'
  url: 'https://bjut.bjutxiaomei.cn/index.php?s=/'
  
})