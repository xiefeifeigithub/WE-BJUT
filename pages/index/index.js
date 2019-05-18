//获取应用实例
var app = getApp()
var common = require('../../utils/common.js');
Page({
  data: {
    //轮播图
    imgUrls: [],  //轮播图内容
    indicatorDots: false, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3500, //自动切换时间间隔
    duration: 1200, //滑动动画时长
    inputShowed: false,
    inputVal: "",
    //导航数据
    student:
      [
        {
          icon: '/images/kjs.png',   //0
          src: '../timetable/timetable',
          title: '课表'
        },
        {
          icon: '/images/ck.png',   // 1
          src: '../rooms/rooms',
          title: "空教室"
        },
        {
          icon: '/images/tsg.png',  // 2
          src: '/pages/score/score-query',
          title: "成绩"
        },
        {
          icon: '/images/cet.png',   //4
          src: '../cet/cet',
          title: "等级考试"
        },
        {
          icon: '/images/kc.png',   //3
          src: '/pages/exam/exam',
          title: "考试信息"
        },
        {
          icon: '/images/ditu.png',  //5 
          src: '/pages/map/map',
          title: "地点查询"
        },
        {
          icon: '/images/dianhua.png', //6
          src: '/pages/phone/phone',
          title: '电话黄页'
        },
        {
          icon: '/images/qa.png',  //7 
          src: '/pages/qa/qa',
          title: '一问一答'
        }
      ]
  },

  //处理主页点击图标跳事件
  touchIcon: function (options) {
    console.log(options.currentTarget.dataset.index)
    switch (options.currentTarget.dataset.index) {
      case "0":
      //先判断用户是否登录过
        if (app.globalData.hasTimetableAndInfo) {
          wx.navigateTo({
            url: '../timetable/timetable',
          })
        } else {
          wx.switchTab({
            url: '../account/account',
          })
        }
        break;
      case "1":
        wx.navigateTo({
          url: '../rooms/rooms',
        });
        break;
      case "2":
        //先判断用户是否登录过
        if (app.globalData.hasTimetableAndInfo){
          wx.request({
            url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Score/Score/getCanuseScore',
            success:function(res){
              console.log(res)
              if(res.data[0].canuse == "1"){
                console.log("执行跳转逻辑")
                wx.navigateTo({
                  url: '../score/score-query',
                })
              } else if (res.data[0].canuse == "0"){
                wx.showToast({
                  title: '教务当前没有成绩数据',
                  icon: 'none'
                }); 
              }
            }
          })
        } else {
          wx.switchTab({
            url: '../account/account',
          })
        }
        break;
      case "4":
      //先判断用户是否登录过
        if (app.globalData.hasTimetableAndInfo) {
          if(app.globalData.hasCetInfo){
            wx.navigateTo({
              url: '../cet/cet',
            });
          }else{
            wx.showToast({
              title: '教务当前没有数据',
              icon: 'none'
            }); 
          }
        } else {
          wx.switchTab({
            url: '../account/account',
          })
        }
        break;
      case "3":
        //此处代码不可删除
        if (app.globalData.hasTimetableAndInfo){
          if(app.globalData.hasExamInfo){
            wx.navigateTo({
              url: '/pages/exam/exam',
            });
          }else{
            wx.showToast({
              title: '教务当前没有考试数据',
              icon: 'none'
            });
          }
        }else {
          wx.switchTab({
            url: '../account/account',
          })
        }
        break;
      case "5":
        wx.navigateTo({
          url: '/pages/map/map',
        }); 
        break;
      case "6":
        wx.navigateTo({
          url: '/pages/phone/phone',
        }); 
        break;
      case "7":
        wx.navigateTo({
          url: '/pages/qa/qa',
        }); 
        break;
    }
  },
  
  onLoad: function () {
    this.updataData()
    console.log("onLoad ~ 请求轮播图数据")
  },

  //更新轮播图通告
  onHide: function (){
    this.updataData()
    console.log("onHide ~ 更新轮播图数据")
  },

  //更新轮播图通告
  updataData: function(){
    var limit = 4 //加载4篇轮播图文章
    var lastid = 0
    var that = this

    wx.request({
      url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Imagetitle/Imagetitle/getImagetitle',
      data: { lastid: lastid, limit: limit },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({ imgUrls: res.data })
      },
      fail: function (res) {
        console.log("服务器开小差了...")
      }
    })
  },

  //点击轮播图进入内容页
  clickImage: function (e) {
    console.log("轮播图点击跳转")
    var id = e.currentTarget.dataset.id;
    console.log("所选文章id：" + id)
    wx.navigateTo({
      url: '../../pages/extension/extension?id=' + id
    })
  },

  onShow:function(){
    if(app.globalData.hasExamInfo == false){
      console.log("没有获取到考试信息，尝试获取，前提是当前在登录状态")
      var account = wx.getStorageSync(app.data.keyUserName)
      var password = wx.getStorageSync(app.data.keyPwd)
      var that = this
      //考试信息
      wx.request({
        // https://www.bjut1960.cn/examination?xh=学号&mm=密码
        url: 'https://www.bjut1960.cn/examination',
        method: 'POST',
        data: {
          xh: account,
          mm: password
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if (res.statusCode == 200) {
            console.log("考试信息返回成功")
            wx.setStorage({
              key: app.data.keyExamInfo,
              data: res.data,
            })
            console.log('从主页拿到考试信息数据')
            app.globalData.hasExamInfo = true;
          } else {
            console.log("404")
          }
        },
        fail: function (res) {
          console.log("请求考试信息出错:" + res)
        }
      });
      
    }else{
      console.log("取到考试信息，直接查看")
    }
  }
  
})
