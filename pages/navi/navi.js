var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var mapcenter;
var mapcenterlat
Page({
  /**
   * 页面的初始数据
   */
  
  data: {
    markers1:[{
      longitude: 116.479657,
      latitude: 39.872994, 
      name:'科学楼',
      width: 50,
      height: 50,
      callout: {
        content: '科学楼',
        fontSize: "18",
        fontFamily : "SimSun",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
      }
    }],
    markers2:[{
      longitude: 116.477318,
      latitude: 39.875437,
      name: '西门',
      width: 50,
      height: 50,
      callout: {
        content: '西门',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
      }
    },
    {
      longitude: 116.479762,
      latitude: 39.871643,
      name: '南门',
      width: 50,
      height: 50,
      callout: {
        content: '南门',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
      }
    },
    {
      longitude: 116.4817900000,
      latitude: 39.8793400000,
      name: '北门',
      width: 50,
      height: 50,
      callout: {
        content: '北门',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.4837900000,
      latitude: 39.8779500000,
      name: '东门',
      width: 50,
      height: 50,
      callout: {
        content: '东门',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    }
    ],
    markers3: [
    {
      longitude: 116.478834,
      latitude: 39.877908,
      name: '第一教学楼',
      width: 50,
      height: 50,
      callout: {
        content: '第一教学楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
      }
    },
    {
      longitude: 116.478197,
      latitude: 39.877400,
      name: '第二教学楼',
      width: 50,
      height: 50,
      callout: {
        content: '第二教学楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
      }
    },
    {
      longitude: 116.481247,
      latitude: 39.875476,
      name: '第三教学楼',
      width: 50,
      height: 50,
      callout: {
        content: '第三教学楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.4844890000,
      latitude: 39.8754500000,
      name: '第四教学楼',
      width: 50,
      height: 50,
      callout: {
        content: '第四教学楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    }
    ],
    markers4: [
    {
      longitude: 116.476735,
      latitude: 39.877767,
      name: '机电楼',
      width: 50,
      height: 50,
      callout: {
        content: '机电楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.476617,
      latitude: 39.877415,
      name: '基础楼',
      width: 50,
      height: 50,
      callout: {
        content: '基础楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.476326,
      latitude: 39.877372,
      name: '环化楼',
      width: 50,
      height: 50,
      callout: {
        content: '环化楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.476605,
      latitude: 39.876985,
      name: '建工楼',
      width: 50,
      height: 50,
      callout: {
        content: '建工楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.478847,
      latitude: 39.876839,
      name: '材料楼',
      width: 50,
      height: 50,
      callout: {
        content: '材料楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.480636,
      latitude: 39.876831,
      name: '数理楼',
      width: 50,
      height: 50,
      callout: {
        content: '数理楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.484162,
      latitude: 39.876356,
      name: '能源楼',
      width: 50,
      height: 50,
      callout: {
        content: '能源楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.478165,
      latitude: 39.875181,
      name: '信息楼',
      width: 50,
      height: 50,
      callout: {
        content: '信息楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.484907,
      latitude: 39.874652,
      name: '艺术楼',
      width: 50,
      height: 50,
      callout: {
        content: '艺术楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.486330,
      latitude: 39.875504,
      name: '理科楼',
      width: 50,
      height: 50,
      callout: {
        content: '理科楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.478246,
      latitude: 39.873424,
      name: '经管楼',
      width: 50,
      height: 50,
      callout: {
        content: '经管楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.481501,
      latitude: 39.872114,
      name: '人文楼',
      width: 50,
      height: 50,
      callout: {
        content: '人文楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.485965,
      latitude: 39.872764,
      name: '实训楼',
      width: 50,
      height: 50,
      callout: {
        content: '实训楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.486186,
      latitude: 39.873208,
      name: '城建楼',
      width: 50,
      height: 50,
      callout: {
        content: '城建楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    {
      longitude: 116.486781,
      latitude: 39.873617,
      name: '软件楼',
      width: 50,
      height: 50,
      callout: {
        content: '软件楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS",
      }
    },
    ],

    markers5: [
    {
      longitude: 116.482834,
      latitude: 39.877431,
      name: '北田径场',
      width: 50,
      height: 50,
      callout: {
        content: '北田径场',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
      }
    },
    {
      longitude: 116.483263,
      latitude: 39.874570,
      name: '南田径场',
      width: 50,
      height: 50,
      callout: {
        content: '南田径场',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
      }
    },
    {
      longitude: 116.483880,
      latitude: 39.872445,
      name: '奥运场馆',
      width: 50,
      height: 50,
      callout: {
        content: '奥运场馆',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.481644,
      latitude: 39.876783,
      name: '游泳馆',
      width: 50,
      height: 50,
      callout: {
        content: '游泳馆',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    }
    ],

    markers7: [
    {
      longitude: 116.478000,
      latitude: 39.879134,
      name: '天天餐厅第二餐厅',
      width: 50,
      height: 50,
      callout: {
        content: '天天餐厅第二餐厅',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
      }
    },
    {
      longitude: 116.480367,
      latitude: 39.873818,
      name: '美食园',
      width: 50,
      height: 50,
      callout: {
        content: '美食园',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
      }
    },
    {
      longitude: 116.481916,
      latitude: 39.873816,
      name: '奥运餐厅',
      width: 50,
      height: 50,
      callout: {
        content: '奥运餐厅',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.480438,
      latitude: 39.878741,
      name: '天天餐厅&清真食堂',
      width: 50,
      height: 50,
      callout: {
        content: '天天餐厅&清真食堂',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    ],
    markers6: [
    {
      longitude: 116.479052,
      latitude: 39.879193,
      name: '学生宿舍1&2',
      width: 50,
      height: 50,
      callout: {
        content: '学生宿舍1&2',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
      }
    },
    {
      longitude: 116.481396,
      latitude: 39.879144,
      name: '学生宿舍3&4',
      width: 50,
      height: 50,
      callout: {
        content: '学生宿舍3&4',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
      }
    },
    {
      longitude: 116.482868,
      latitude: 39.878179,
      name: '学生宿舍10&11',
      width: 50,
      height: 50,
      callout: {
        content: '学生宿舍10&11',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.481712,
      latitude: 39.874636,
      name: '学生宿舍7&9&9&12',
      width: 50,
      height: 50,
      callout: {
        content: '学生宿舍7&9&9&12',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.481000,
      latitude: 39.872999,
      name: '学生宿舍5&6',
      width: 50,
      height: 50,
      callout: {
        content: '学生宿舍5&6',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.483819,
      latitude: 39.877234,
      name: '学生宿舍北研楼',
      width: 50,
      height: 50,
      callout: {
        content: '学生宿舍北研楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    ],
    markers8: [
    {
      longitude: 116.480438,
      latitude: 39.878741,
      name: '学生综合服务中心',
      width: 50,
      height: 50,
      callout: {
        content: '学生综合服务中心',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
      }
    },
    {
      longitude: 116.482108,
      latitude: 39.879071,
      name: '校医院',
      width: 50,
      height: 50,
      callout: {
        content: '校医院',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
      }
    },
    {
      longitude: 116.482061,
      latitude: 39.878691,
      name: '北浴室',
      width: 50,
      height: 50,
      callout: {
        content: '北浴室',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.482548,
      latitude: 39.874175,
      name: '南浴室',
      width: 50,
      height: 50,
      callout: {
        content: '南浴室',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.482893,
      latitude: 39.878604,
      name: '金工楼',
      width: 50,
      height: 50,
      callout: {
        content: '金工楼',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.480892,
      latitude: 39.877368,
      name: '礼堂',
      width: 50,
      height: 50,
      callout: {
        content: '礼堂',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.481094,
      latitude: 39.878240,
      name: '学生活动中心',
      width: 50,
      height: 50,
      callout: {
        content: '学生活动中心',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.483783,
      latitude: 39.87786,
      name: '保卫处',
      width: 50,
      height: 50,
      callout: {
        content: '保卫处',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.485890,
      latitude: 39.873798,
      name: '月亮湖',
      width: 50,
      height: 50,
      callout: {
        content: '月亮湖',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.480497,
      latitude: 39.874964,
      name: '知新园',
      width: 50,
      height: 50,
      callout: {
        content: '知新园',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.479744,
      latitude: 39.875077,
      name: '逸夫图书馆',
      width: 50,
      height: 50,
      callout: {
        content: '逸夫图书馆',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    {
      longitude: 116.478191,
      latitude: 39.872227,
      name: '工大建国饭店',
      width: 50,
      height: 50,
      callout: {
        content: '工大建国饭店',
        fontSize: "18",
        borderRadius: "8",
        padding: "3",
        display: "ALWAYS", 
     }
    },
    ],
    markers9: [
      {
        longitude: 116.668796,
        latitude: 39.928352,
        name: '汲学楼',
        width: 50,
        height: 50,
        callout: {
          content: '汲学楼',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.669573,
        latitude: 39.931181,
        name: '学生公寓',
        width: 50,
        height: 50,
        callout: {
          content: '学生公寓',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.669926,
        latitude: 39.929370,
        name: '第一教学楼',
        width: 50,
        height: 50,
        callout: {
          content: '第一教学楼',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.670367,
        latitude: 39.929437,
        name: '第二教学楼',
        width: 50,
        height: 50,
        callout: {
          content: '第二教学楼',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.670253,
        latitude: 39.929796,
        name: '第三教学楼',
        width: 50,
        height: 50,
        callout: {
          content: '第三教学楼',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.669730,
        latitude: 39.928733,
        name: '第四教学楼',
        width: 50,
        height: 50,
        callout: {
          content: '第四教学楼',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.669759,
        latitude: 39.930693,
        name: '图书馆',
        width: 50,
        height: 50,
        callout: {
          content: '图书馆',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.669998,
        latitude: 39.928941,
        name: '明德楼&问渠楼',
        width: 50,
        height: 50,
        callout: {
          content: '明德楼&问渠楼',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.669618,
        latitude: 39.930127,
        name: '田园餐厅',
        width: 50,
        height: 50,
        callout: {
          content: '田园餐厅',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.669922,
        latitude: 39.930310,
        name: '体育馆',
        width: 50,
        height: 50,
        callout: {
          content: '体育馆',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.668131,
        latitude: 39.930784,
        name: '游泳馆',
        width: 50,
        height: 50,
        callout: {
          content: '游泳馆',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.668130,
        latitude: 39.929667,
        name: '足球场',
        width: 50,
        height: 50,
        callout: {
          content: '足球场',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.667141,
        latitude: 39.929366,
        name: '篮球场',
        width: 50,
        height: 50,
        callout: {
          content: '篮球场',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.667066,
        latitude: 39.930451,
        name: '网球场',
        width: 50,
        height: 50,
        callout: {
          content: '网球场',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.670477,
        latitude: 39.930885,
        name: '跆拳道馆',
        width: 50,
        height: 50,
        callout: {
          content: '跆拳道馆',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.669055,
        latitude: 39.927887,
        name: '南门',
        width: 50,
        height: 50,
        callout: {
          content: '南门',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.670589,
        latitude: 39.928261,
        name: '东南门',
        width: 50,
        height: 50,
        callout: {
          content: '东南门',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.668319,
        latitude: 39.931176,
        name: '北门',
        width: 50,
        height: 50,
        callout: {
          content: '北门',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.670548,
        latitude: 39.931089,
        name: '浴室',
        width: 50,
        height: 50,
        callout: {
          content: '浴室',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      {
        longitude: 116.669422,
        latitude: 39.928680,
        name: '第四报告厅',
        width: 50,
        height: 50,
        callout: {
          content: '第四报告厅',
          fontSize: "18",
          borderRadius: "8",
          padding: "3",
          display: "ALWAYS",
        }
      },
      
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'JQKBZ-YTNWF-HMTJZ-NCVON-KCPXE-F3B3Z',
    });
    wx.startLocationUpdate({});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //初始化地图标点所用指针
    this.setData({
      mapmarkers: this.data.markers1,
      mapcenterlong: this.data.markers1[0]['longitude'],
      mapcenterlat: this.data.markers1[0]['latitude'],
      maplocatname: this.data.markers1[0]['name']
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  //底部加好移动
  viewTouchMove: function(e) {
    var that = this;
    that.setData({
      left: e.touches[0].clientX - 50,
      top: e.touches[0].clientY - 50
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
//操作指针来控制地图标点
  f0:function(){
    this.setData({
      mapmarkers: this.data.markers1,
      mapcenterlong:this.data.markers1[0]['longitude'],
      mapcenterlat: this.data.markers1[0]['latitude'],
      maplocatname: this.data.markers1[0]['name']
    })
  },

  f1: function () {
    this.setData({
      mapmarkers: this.data.markers2,
      mapcenterlong: this.data.markers2[0]['longitude'],
      mapcenterlat: this.data.markers2[0]['latitude'],
      maplocatname: this.data.markers2[0]['name']
    })
  },

  f2: function () {
    this.setData({
      mapmarkers: this.data.markers3,
      mapcenterlong: this.data.markers3[0]['longitude'],
      mapcenterlat: this.data.markers3[0]['latitude'],
      maplocatname: this.data.markers3[0]['name']
    })
  },

  f3: function () {
    this.setData({
      mapmarkers: this.data.markers4,
      mapcenterlong: this.data.markers4[0]['longitude'],
      mapcenterlat: this.data.markers4[0]['latitude'],
      maplocatname: this.data.markers4[0]['name']
    })
  },

  f4: function () {
    this.setData({
      mapmarkers: this.data.markers5,
      mapcenterlong: this.data.markers5[0]['longitude'],
      mapcenterlat: this.data.markers5[0]['latitude'],
      maplocatname: this.data.markers5[0]['name']
    })
  },

  f5: function () {
    this.setData({
      mapmarkers: this.data.markers6,
      mapcenterlong: this.data.markers6[0]['longitude'],
      mapcenterlat: this.data.markers6[0]['latitude'],
      maplocatname: this.data.markers6[0]['name']
    })
  },

  f6: function () {
    this.setData({
      mapmarkers: this.data.markers7,
      mapcenterlong: this.data.markers7[0]['longitude'],
      mapcenterlat: this.data.markers7[0]['latitude'],
      maplocatname: this.data.markers7[0]['name']
    })
  },
  
  f7: function () {
    this.setData({
      mapmarkers: this.data.markers8,
      mapcenterlong: this.data.markers8[0]['longitude'],
      mapcenterlat: this.data.markers8[0]['latitude'],
      maplocatname: this.data.markers8[0]['name']
    })
  },

  f8: function () {
    this.setData({
      mapmarkers: this.data.markers9,
      mapcenterlong: this.data.markers9[0]['longitude'],
      mapcenterlat: this.data.markers9[0]['latitude'],
      maplocatname: this.data.markers9[0]['name']
    })
  },

  //跳转并传递数值
  jumpPage: function(events){
    var longitudetonavigat=events.currentTarget.dataset.longitude;
    var latitudetonavigat = events.currentTarget.dataset.latitude;
    var nametonavigat = events.currentTarget.dataset.name;
    var navito = { latitude: latitudetonavigat, longitude: longitudetonavigat};
    this.setData({
      navito:navito
    });
    wx.navigateTo({
      url: '/pages/navigatpage/navigatpage?navito='+JSON.stringify(navito),
    })
  }
})

