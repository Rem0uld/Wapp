const app = getApp();

Page({
    data: {
        score: '',
    },

    goIndex: function() {
        wx.reLaunch({
          url: '../index/index',
        })
    },

    goOrder:function(){
      wx.reLaunch({
        url: '../order/order',
      })
    },

    onLoad: function(options) {
        console.log('result score'+app.globalData.score);
        this.setData({
          score: app.globalData.score,
        })
    },
  
})