// pages/lists/lists.js
Page({
  data: {
    newsList:[],
    lastid:0
  },
  loadData:function (lastid){
    var limit = 2
    var that = this
    //发起网络请求
    wx.request({
      url: 'http://localhost:8080/weicms/index.php?s=/addon/Cms/Cms/getlist', // 仅为示例，并非真实的接口地址
      data: {lastid:lastid, limit:limit},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

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
    var id = event.currentTarget.dataset.lastid
    this.loadData(id);
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this

    this.loadData(0);
  }
})