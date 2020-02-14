Page({
  //页面初始数据
  data: {
    info: {},
    source:"",
  },

  onLoad: function (options){
    var source = ''
    console.log("所选轮播图id：" + options.id)
    switch(options.id){
      case '0':
        break;
      case '1': 
        source = "https://mp.weixin.qq.com/s?__biz=MjM5OTEyODg2MA==&mid=2649888704&idx=1&sn=3b44462eda690768f84c9646eba79a32&chksm=bec68db389b104a5ac681fe6742ab793398bfae46bae6df6ac8ed1632b81f437a172787067e3&mpshare=1&scene=1&srcid=&sharer_sharetime=1581687748949&sharer_shareid=dc1be066cd299aec0cab3c05dde18aa4#rd"; 
        break;
      case '2':
        source = "https://mp.weixin.qq.com/s?__biz=MzA3MjE2Mjg2NA==&mid=2653053920&idx=1&sn=0d4934ca3587e30011842f9ae41d0016&chksm=84f448bfb383c1a9ca448f295f8879790475bae1e61489945f0775289308f827f529c7d48e4d&mpshare=1&scene=1&srcid=&sharer_sharetime=1581687589460&sharer_shareid=dc1be066cd299aec0cab3c05dde18aa4#rd";
        break;
      case '3':
        source = "https://mp.weixin.qq.com/s?__biz=MjM5OTEyODg2MA==&mid=2649888834&idx=1&sn=1190833f0ef9e19dbcc667c8aeb5d259&chksm=bec6823189b10b273effb2e40d4c3fe2da89204cd2ae9dd92b20516e47a8a98f75ec828a3645&mpshare=1&scene=1&srcid=&sharer_sharetime=1581687696294&sharer_shareid=dc1be066cd299aec0cab3c05dde18aa4#rd";
        break;
      default:
        console.log("extension break")
        break;
    }
    this.setData({source: source})
  },

  // onLoad: function (options) {
  //   console.log("所选轮播图id：" + options.id)
  //   var difference = ''
  //   if(options.id == 0) difference = '图0'
  //   if (options.id == 1) difference = '图1'
  //   if (options.id == 2) difference = '图2'
  //   if (options.id == 3) difference = '图3'

  //   var obj = this
  //   //发起网络请求
  //   wx.request({
  //     url: 'https://www.bjutxiaomei.cn/index.php?s=/addon/Extension/Extension/getExtension', 
  //     data: { id: options.id, difference: difference },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success(res) {
  //       obj.setData({ info: res.data[0] })
  //     },
  //     fail: function (res) {
  //       wx.showToast({
  //         title: '获取数据失败,请检查网络连接',
  //       })
  //     }
  //   }); //wx.request
  // },

  
  onShareAppMessage: function () {
    //用户点击右上角分享
  }
})