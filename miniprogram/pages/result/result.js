const app = getApp();
Page({
    data: {
      score: '',
      chooseArr: [],
      answerArr: [],
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
        console.log("选择的数组"+app.globalData.choose);
        console.log("答案数组"+app.globalData.answer)
        this.setData({
          score: Math.round (app.globalData.score),
          chooseArr:app.globalData.choose,
          answerArr: app.globalData.answer,
        })
        
    },
  
})