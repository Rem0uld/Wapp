const app = getApp();
Page({
    data: {
        score: '',
    },

    goIndex: function() {
        wx.switchTab({
          url: '../index/index',
        })
    },

    goOrder:function(){
      wx.navigateTo({
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