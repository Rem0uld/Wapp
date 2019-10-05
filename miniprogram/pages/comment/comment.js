const app = getApp();
const db = wx.cloud.database();
Page({

  data: {
    fullStarUrl: '../../images/fullstar.png',
    nullStarUrl: '../../images/nullstar.png', 
    score: 0,
    scoreArray: [1, 2, 3, 4, 5], 
    scoreText: ['失望', '勉强', '还行', '不错', '推荐'], 
    scoreContent: ''

  },
  changeScore: function (e) {
    console.log(e)//控制台触摸事件信息
    var that = this;
    var num = 0;
    var touchX = e.touches[0].pageX;
    var starMinX = 90;
    var starWidth = 20;
    var starLen =10;
    var starMaxX = starWidth * 5 + starLen * 4 + starMinX;
    if (touchX > starMinX && touchX < starMaxX) {
      num = Math.ceil((touchX - starMinX) / (starWidth + starLen));
      if (num != that.data.score) {
        that.setData({
          score: num,
          scoreContent: that.data.scoreText[num - 1]
        })
      }
    } else if (touchX < starMinX) {
      that.setData({
        score: 0,
        scoreContent: ''
      })
    }
  },

  onLoad: function (options) {

  },



})