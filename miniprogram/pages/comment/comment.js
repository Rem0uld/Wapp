const app = getApp();
const db = wx.cloud.database();
Page({

  data: {
    stars: [0, 1, 2, 3, 4],
    nullsrc: '../../images/null.png',
    halfsrc: '../../images/half.png',
    allsrc: '../../images/all.png',
  },

  goBack: function() {
    wx.navigateBack({
      delta: 1,
    })
  },
 
  onLoad: function(options) {

  },



})