Page({

  data: {
    array: ["中国", "美国", "巴西", "日本"],
    area: 0,
    score: 0
  },

  //地区选择
  bindPickerChange: function(e) {
    console.log('form发生了Picker事件，携带数据为：', e.detail.value)
    this.setData({ area: e.detail.value} )
  },
  //评分
  bindSliderChange : function(e) {
    console.log('form发生了Slider事件，携带数据为：', e.detail.value)
    this.setData({ score: e.detail.value })
  },

  //表单提交
  formSubmit(e) {
    var formData = e.detail.value
    formData.area = this.data.area
    formData.score = this.data.score
    console.log('form发生了submit事件，携带数据为：', formData)


    var that = this

    //发起网络请求
    wx.request({
      url: 'http://localhost:8080/weicms/index.php?s=/addon/Feedback/Feedback/addFeedback', // 仅为示例，并非真实的接口地址
      data: formData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
       
      },
      //显示加载中提示
      complete: function () { 
        
      }
    })
  }
})