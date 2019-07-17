const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    score: 60,
    teacherInfo: [],



  },



  onLoad: function(options) {
    db.collection('teacherInfo').get({
      success:res=>{
        this.setData({
          teacherInfo: res.data[0].teachers
        })
      }
    })


    db.collection('userInfo').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log(res.data[0].score)
        this.setData({
          score: res.data[0].score
        })
      }
    })
  },



})