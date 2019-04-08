
//先从缓存中获取数据，若无，则从server获取
function loadInfo(id,obj,callback,cache){
  var key = 'info_' + id
  //获取缓存
  var info = wx.getStorageSync(key)
  if(info){
    obj.setData({ info: info })
    console.log('data from localCache')
    cache(info)
    
    return true
  }           

  //发起网络请求
  wx.request({
  //  url: 'http://localhost:8080/weicms/index.php?s=/addon/Cms/Cms/getDetail', // 仅为示例，并非真实的接口地址
    url: 'https://bjut.bjutxiaomei.cn/index.php?s=/addon/Cms/Cms/getDetail', // 真实的接口地址
    data: { id: id },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log("success")
      console.log(res.data)

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
      obj.setData({ toastHidden: false, msg: '当前网络异常，请稍后再试' })
    }
  })
}
//暴露接口
module.exports = {
  loadInfo: loadInfo
}