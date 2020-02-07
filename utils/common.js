var app = getApp()

//先从缓存中获取数据，若无，则从server获取
function loadInfo(id,obj){
  var key = 'info_' + id
 // 获取缓存
  var info = wx.getStorageSync(key)
  if(info){
    obj.setData({ info: info })
    console.log('从缓存中获取文章内容')
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
    },
    //获取服务器数据失败
    fail: function (res) {
      console.log('server error')
    }
  })
}

//暴露接口
module.exports = {
  loadInfo: loadInfo,
}