// component/loginInfoToast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loginInfo:{
      type:String,
      value:"登录说明"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
  }
})
