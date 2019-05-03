// pages/rooms/rooms.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeyPick: true,
    weekPick: true,
    dayPick: true,
    timePick: true,

    //查询字段 
    buildingName:'', //查询教学楼的名称
    
    storeyArray: ['第一教学楼', '第三教学楼', '第四教学楼'],
    storeyIndex: 0,
    weekArray: ['第一周', '第二周', '第三周', '第四周',
      '第五周', '第六周', '第七周', '第八周', '第九周', '第十周',
      '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周'
    ],
    weekIndex: 0,
    dayArray: [ '星期日','星期一', '星期二', '星期三', '星期四', '星期五','星期六'],
    dayIndex: 0,
    timeArray: ['上午','下午','晚上'],
    timeIndex: 0,
    techBuilding: 0,            //查询哪栋教学楼[1,3,4]：一教、三教、四教
    week: 0,                    //查询哪个周[1-16周]
    weekday: '',                //查询周几[周一至周日]
    classStart: 0,              //查询哪个时段（开始）
    classEnd: 0,                //查询哪个时段（结束）
    defaultWeek:null,           //当前是第几周
    defaultWeekday:null,         //当前是周几
    emptyRooms:[]
  },

  storeyPickerChange: function(e) {
    var that = this
    if (e.detail.value == 0) {
      that.setData({
        techBuilding: 1
      })
      that.setData({
        buildingName: '一教'
      })
    } else if (e.detail.value == 1) {
      that.setData({
        techBuilding: 3
      })
      that.setData({
        buildingName: '三教'
      })
    } else if (e.detail.value == 2) {
      that.setData({
        techBuilding: 4
      })
      that.setData({
        buildingName: '四教'
      })
    }
    this.setData({
      storeyIndex: e.detail.value,
      storeyPick: false
    })
  },

  weekPickerChange: function(e) {
    var that = this
    var temp = parseInt(e.detail.value)
    temp += 1;
    that.setData({
      week: temp
    })
    console.log(that.data.week)
    this.setData({
      weekIndex: e.detail.value,
      weekPick: false
    })
  },

  dayPickerChange: function(e) {
    var that = this
    var tempWeekdayStr = that.data.dayArray[e.detail.value];
    var tempWeekday = tempWeekdayStr.charAt(2);
    that.setData({
      weekday: tempWeekday
    })
    this.setData({
      dayIndex: e.detail.value,
      dayPick: false
    })
  },

  timePickerChange: function(e) {
    var that = this
    var tempClassTime = that.data.timeArray[e.detail.value]
    var timeStart = 0
    var timeEnd = 0
    if (e.detail.value == 0){
      timeStart = 1;
      timeEnd = 4;
    } else if (e.detail.value == 1){
      timeStart = 5;
      timeEnd = 8;
    } else if (e.detail.value == 2){
      timeStart =9;
      timeEnd = 12;
    }
    that.setData({
      classStart: timeStart,
      classEnd: timeEnd
    })

    this.setData({
      timeIndex: e.detail.value,
      timePick: false
    })
  },

  onTap: function(event) {
    //url请求示例：www.bjut1960.cn/freeroom?building=4&week=一&currentweek=8&time1=3&time2=4
    //含义：查询四教周一第八周第3、4节空闲的教室
    var that = this
    var buildingUrl = 'building=' + that.data.techBuilding;
    var weekdayUrl = '&week=' + that.data.weekday;
    var weekUrl = '&currentweek=' + that.data.week;
    var classTimeUrl = '&time1=' + that.data.classStart + '&time2=' + that.data.classEnd;
    var requestUrl = buildingUrl + weekdayUrl + weekUrl + classTimeUrl;
    console.log('查询的URL:'+requestUrl)
    wx.request({
      url: 'https://www.bjut1960.cn/freeroom?' + requestUrl,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        if (res.statusCode == 200) {
          that.setData({emptyRooms:res.data})
         
          var tempStr = '';
          if(that.data.emptyRooms.length == 0){
            tempStr = '没有符合查询条件的空闲教室...'
          }else{
            for (var i = 0; i < that.data.emptyRooms.length; i++) {
              tempStr += '[' + that.data.emptyRooms[i] + ']' + ' ';
            }
          }
          wx.showModal({
            title: that.data.buildingName + '空闲教室情况',
            content: tempStr,
          })
        }else{
          wx.showToast({
            title: '请检查输入的有效性',
            icon:'none'
          })
        }
      },
      fail: function(res) {
        console.log("请求查询空教室出现异常...")
        console.log(res)
      }
    })
    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log("转到身份认证界面")
    // wx.switchTab({
    //   url: '../account/account',
    // })

    //获取周的初始值、周几的初始值
    var currDate = new Date();
    var currWeek = app.globalData.currentWeek;
    var defaultWeek = this.data.weekArray[currWeek - 1];
    var tempWeekdayStr = this.data.dayArray[currDate.getDay()];
    var tempWeekday = tempWeekdayStr.charAt(2);

    this.setData({ 
      week: currWeek,
      weekday:tempWeekday,
      defaultWeek:defaultWeek,
      defaultWeekday: tempWeekdayStr
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      storeyPick: true,
      weekPick: true,
      dayPick: true,
      timePick: true,
    })
  },

})