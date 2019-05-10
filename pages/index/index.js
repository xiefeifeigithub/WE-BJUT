//获取应用实例
var app = getApp()
Page({
  data: {
    //轮播图
    imgUrls: [],  //轮播图内容
    indicatorDots: false, //是否显示面板指示点
    // text: "(内测版本)公告：修复bug：查空教室之前数据有误，目前已经修复啦:)",
    // marqueePace: 0.5,//滚动速度
    // marqueeDistance: 0,//初始滚动距离
    // marquee_margin: 30,
    // size: 14,
    // interval0: 20, // 时间间隔

    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //滑动动画时长
    inputShowed: false,
    inputVal: "",
    //导航数据
    student:
      [
        {
          icon: '/images/kjs.png',
          src: '../timetable/timetable',
          title: '课表'
        },
        {
          icon: '/images/ck.png',
          src: '../rooms/rooms',
          title: "空教室"
        },
        {
          icon: '/images/tsg.png',
          src: '/pages/score/score-query',
          title: "成绩"
        },
        {
          icon: '/images/cet.png',
          src: '../cet/cet',
          title: "等级考试"
        },
        {
          icon: '/images/kc.png',
          src: '/pages/exam/exam',
          title: "考试信息"
        },
        {
          icon: '/images/ditu.png',
          src: '/pages/map/map',
          title: "地点查询"
        },
        {
          icon: '/images/dianhua.png',
          src: '/pages/phone/phone',
          title: '电话黄页'
        },
        {
          icon: '/images/qa.png',
          src: '/pages/qa/qa',
          title: '一问一答'
        }
      ]
  },



  //处理主页点击图标跳事件
  touchIcon: function (options) {
    switch (options.target.id) {
      case "0":
        if (app.globalData.hasLocalData) {
          wx.navigateTo({
            url: this.data.student[0].src,
          })
        } else {
          wx.switchTab({
            url: '../account/account',
          })
        }
        break;
      case "1":
        wx.navigateTo({
          url: this.data.student[1].src,
        });
        break;
      case "2":
        //此处代码不可删除
        // if (app.globalData.hasLocalData){
        //   wx.navigateTo({
        //     url: this.data.student[2].src,
        //   }); break;
        // }
        wx.showToast({
          title: '教务当前没有数据',
          icon: 'none'
        }); 
        break;
      case "3":
        if (app.globalData.hasLocalData) {
          wx.navigateTo({
            url: this.data.student[3].src,
          });
        } else {
          wx.switchTab({
            url: '../account/account',
          })
        }
        break;
      case "4":
        //此处代码不可删除
        if (app.globalData.hasLocalData){
          if(app.globalData.hasExamInfo){
            wx.navigateTo({
              url: this.data.student[4].src,
            });
          }else{
            wx.showToast({
              title: '教务当前没有数据',
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
          url: this.data.student[5].src,
        }); break;
      case "6":
        wx.navigateTo({
          url: this.data.student[6].src,
        }); break;
      case "7":
        wx.navigateTo({
          url: this.data.student[7].src,
        }); break;
    }
  },
  
  onLoad: function () {
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

  // onShow: function () {
  //   var that = this;
  //   var length = that.data.text.length * that.data.size;//文字长度
  //   var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
  //   //console.log(length,windowWidth);
  //   that.setData({
  //     length: length,
  //     windowWidth: windowWidth
  //   });
  //   that.scrolltxt();// 第一个字消失后立即从右边出现
  // },

  // scrolltxt: function () {
  //   var that = this;
  //   var length = that.data.length;//滚动文字的宽度
  //   var windowWidth = that.data.windowWidth;//屏幕宽度
  //   if (length > windowWidth) {
  //     var interval0 = setInterval(function () {
  //       var maxscrollwidth = length + that.data.marquee_margin;//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
  //       var crentleft = that.data.marqueeDistance;
  //       if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
  //         that.setData({
  //           marqueeDistance: crentleft + that.data.marqueePace
  //         })
  //       }
  //       else {
  //         //console.log("替换");
  //         that.setData({
  //           marqueeDistance: 0 // 直接重新滚动
  //         });
  //         clearInterval(interval0);
  //         that.scrolltxt();
  //       }
  //     }, that.data.interval0);
  //   }
  //   else {
  //     that.setData({ marquee_margin: "1000" });//只显示一条不滚动右边间距加大，防止重复显示
  //   }
  // },


  clickImage: function (e) {
    console.log("轮播图点击跳转")
    var id = e.currentTarget.dataset.id;
    console.log("所选文章id：" + id)
    wx.navigateTo({
      url: '../../pages/extension/extension?id=' + id
    })
  }

})
