var app = getApp()

//先从缓存中获取数据，若无，则从server获取
function loadInfo(id,obj,callback,cache){
  var key = 'info_' + id
 // 获取缓存
  var info = wx.getStorageSync(key)
  if(info){
    obj.setData({ info: info })
    console.log('从缓存中获取文章内容')
    cache(info)
    
    return true
  }           

  //发起网络请求
  wx.request({
    url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Cms/Cms/getDetail',
    data: { id: id },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log("请求文章成功")

      //利用setData设定数据
      obj.setData({ info: res.data })

      //网络情况正常下，设置缓存
      console.log(key)
      wx.setStorageSync(key, res.data)
      console.log('data from server')
      callback(res)
    },
    //获取服务器数据失败
    fail: function (res) {
      console.log('server error')
      //别删此处代码
      // wx.showToast({
      //   title: '当前网络异常，请稍后再试...',
      //   icon: 'none'
      // })
    }
  })
}

//触摸开始
function touchStart(e) {
  app.globalData.touchDot = e.touches[0].pageX;
  app.globalData.touchDoty = e.touches[0].pageY;// 获取触摸时的原点
  // 使用js计时器记录时间    
  app.globalData.interval = setInterval(function () {
    app.globalData.time++;
  }, 100);
}

// 触摸结束事件
function touchEndstrategy(e) {
  var touchMove = e.changedTouches[0].pageX;
  var touchMovey = e.changedTouches[0].pageY;
  var touchDoty = app.globalData.touchDoty;
  var touchDot = app.globalData.touchDot;
  // 向左滑动
  if (touchMovey - touchDoty <= 10 && touchMovey - touchDoty >= -10 && app.globalData.time < 10 && app.globalData.flag_hd == true) {
    if (touchMove - touchDot <= -60 && app.globalData.time < 10 && app.globalData.flag_hd == true) {
      app.globalData.flag_hd = false;
      //执行切换页面的方法
      console.log(touchMovey - touchDoty);
      console.log("向右滑动");
      wx.switchTab({
        url: '../account/account'
      })
    }
    // 向右滑动   
    if (touchMove - touchDot >= 60 && app.globalData.time < 10 && app.globalData.flag_hd == true) {
      app.globalData.flag_hd = false;
      //执行切换页面的方法
      console.log(touchMovey - touchDoty);
      console.log("向左滑动");
      wx.switchTab({
        url: '../index/index'
      })
    }
  }
  clearInterval(app.globalData.interval); // 清除setInterval
  app.globalData.time = 0;
}

function touchEndindex(e) {
  var touchMove = e.changedTouches[0].pageX;
  var touchMovey = e.changedTouches[0].pageY;
  var touchDoty = app.globalData.touchDoty;
  var touchDot = app.globalData.touchDot;
  // 向左滑动
  if (touchMovey - touchDoty <= 10 && touchMovey - touchDoty >= -10 && app.globalData.time < 10 && app.globalData.flag_hd == true) {
    if (touchMove - touchDot <= -60 && app.globalData.time < 10 && app.globalData.flag_hd == true) {
      app.globalData.flag_hd = false;
      //执行切换页面的方法
      console.log(touchMovey - touchDoty);
      console.log("向右滑动");
      wx.switchTab({
        url: '../strategy/strategy'
      })
    }
  }
  clearInterval(app.globalData.interval); // 清除setInterval
  app.globalData.time = 0;
}

function touchEndaccount(e) {
  var touchMove = e.changedTouches[0].pageX;
  var touchMovey = e.changedTouches[0].pageY;
  var touchDoty = app.globalData.touchDoty;
  var touchDot = app.globalData.touchDot;
  // 向左滑动
  if (touchMovey - touchDoty <= 10 && touchMovey - touchDoty >= -10 && app.globalData.time < 10 && app.globalData.flag_hd == true) {
    // 向右滑动   
    if (touchMove - touchDot >= 60 && app.globalData.time < 10 && app.globalData.flag_hd == true) {
      app.globalData.flag_hd = false;
      //执行切换页面的方法
      console.log(touchMovey - touchDoty);
      console.log("向左滑动");
      wx.switchTab({
        url: '../strategy/strategy'
      })
    }
  }
  clearInterval(app.globalData.interval); // 清除setInterval
  app.globalData.time = 0;
}





//暴露接口
module.exports = {
  loadInfo: loadInfo,
  touchStart: touchStart,
  touchEndstrategy: touchEndstrategy,
  touchEndindex: touchEndindex,
  touchEndaccount: touchEndaccount
}