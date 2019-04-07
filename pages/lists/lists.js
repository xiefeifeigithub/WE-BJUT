// pages/lists/lists.js
var app = getApp()

Page({
  data: {
    newsList: [],
    lastid: 0,
    toastHidden: true,
    confirmHidden: true,
    isfirst: 1,
    loadHidden: true,
    moreHidden: 'none',
    msg: '没有更多文章了',
 
  },

  loadData:function (lastid){
    console.log(lastid)
    //显示出加载中的提示
    this.setData({loadHidden:false})

    var limit = 20 //文章数
    var type = app.globalData.type
    console.log(type)
    //在javascript中，this代表着当前对象，会随着程序的执行过程中的上下文改变
    ///把this对象复制到临时变量that
    var that = this

    //发起网络请求
    wx.request({
 //     url: 'http://localhost:8080/weicms/index.php?s=/addon/Cms/Cms/getlist', // 仅为示例，并非真实的接口地址
      url: 'https://bjut.bjutxiaomei.cn/index.php?s=/addon/Cms/Cms/getlist', // 真实接口地址
      data: {lastid:lastid, limit:limit,type:type},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
          if(!res.data)
          {
            //提示没有更多数据了
            that.setData({ toastHidden: false })
            //隐藏加载更多按钮
            that.setData({ moreHidden: 'none' })
            return false
          }
          //更新lastid
        console.log(lastid)
          var len = res.data.length
          var oldLastid = lastid
          that.setData( {lastid: res.data[len-1].id})
        console.log(lastid)
          
          //新旧内容拼接
          var dataArr = that.data.newsList
          var newData = dataArr.concat(res.data);

          //设置数据缓存
          if(oldLastid==0){
            wx.setStorageSync('CmsList',newData)
          }

          //利用setData设定数据
          that.setData({ newsList: newData })
          that.setData({ moreHidden: '' })
          
          console.log('data from url')
      },

      //获取服务器数据失败
      fail: function(res){
        if (lastid == 0) {
          //获取缓存
          var newData = wx.getStorageSync('CmsList')
          if (newData) {
            that.setData({ newsList: newData })
            that.setData({ moreHidden: '' })

            var len = newData.length
            that.setData({ lastid: newData[len - 1].id })
          }

          console.log('data from cache')
        }
        else {
          that.setData({ toastHidden: false, moreHidden: 'none', msg: '当前网络异常，请稍后再试' })
        }
      },
      //显示加载中提示
      complete:function() { that.setData({ loadHidden: true }) }
    })
  },
  
  //点击加载更多按钮的操作：提示一次网络状态 + 再次向服务器请求数据
  loadMore: function(event){
    //获取page中的data
    var id = event.currentTarget.dataset.lastid
    var isfirst = event.currentTarget.dataset.isfirst
 
    var that = this

    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        //只对网络状态不在WIFI下提示一次
        if (networkType != "wifi" && isfirst==1){ that.setData({ confirmHidden:false}) }
      }
    })

    this.setData({ isfirst:0})
    this.loadData(id);
  },

  //监听页面加载 页面加载时触发
  onLoad: function (options) {
    console.log('onLoad')
    console.log(options)
    var that = this
    
    //请求数据
    this.loadData(0);
  },
   
  //页面初次渲染完成时触发
  onReady: function(){
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: '文章列表'
    })
  },

  //提示没有更多数据
  totastChange: function(){
    this.setData({ toastHidden:true })
  },

  //提醒网络状况
  modalChange: function(){ this.setData({ confirmHidden: true }) }

})