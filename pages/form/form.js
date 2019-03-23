Page({

  data: {
    array: ["中国", "美国", "俄国", "日本"],
    index: 0,
    data: "2019-04-03",
    time: "12:33"
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset() {
    console.log('form发生了reset事件')
  }
})