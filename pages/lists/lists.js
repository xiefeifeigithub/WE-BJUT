// pages/lists/lists.js
Page({
  data: {
    newsList: [],
    lastid: 0,
    toastHidden: true,
    confirmHidden: true,
    isfirst: 1
  },

  loadData:function (lastid){
    //
    var limit = 5
    var that = this
    //发起网络请求
    wx.request({
      url: 'http://localhost:8080/weicms/index.php?s=/addon/Cms/Cms/getlist', // 仅为示例，并非真实的接口地址
      data: {lastid:lastid, limit:limit},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
          if(!res.data)
          {
              that.setData({
                toastHidden: false
              })

              return false
          }
          console.log(res.data)

          var len = res.data.length
          that.setData( {lastid: res.data[len-1].id})

          var dataArr = that.data.newsList
          var newData = dataArr.concat(res.data);

          //利用setData设定数据
          that.setData({
            newsList: newData
          })
      }
    })
  },

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
        if (networkType != "wifi" && isfirst==1){
          that.setData({ confirmHidden:false})
        }
      }
    })

    this.setData({ isfirst:0})
    this.loadData(id);
  },

  //监听页面加载
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    
    this.loadData(0);
  },
  
  totastChange: function(){
    this.setData({ toastHidden:true })
  },
  
  modalChange: function(){
    this.setData({ confirmHidden: true })
  }
})