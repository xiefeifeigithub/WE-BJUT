// pages/rooms/rooms-inquiry/rooms-inquiry.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      freeRooms:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
      this.setData({freeRooms:app.globalData.freeRooms})
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      wx.hideLoading()
    },

})