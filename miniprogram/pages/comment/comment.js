const app = getApp();
const db = wx.cloud.database();
Page({

  data: {

  },

  goBack:function(){
    wx.navigateBack({
      delta: 1,
    })
  },



  onLoad: function (options) {

  },


  
})