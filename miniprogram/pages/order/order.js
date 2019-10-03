const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    score: null,
    teacherInfo: [],
  },



  onLoad: function (options) {
    db.collection('teacherInfo').get({
      success: res => {
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
        if (res.data[0].score < 60)
          wx.showModal({
            title: '错误',
            content: '考试成绩不合格，无法预约，请重新考试！',
            success: res => {
              if (res.confirm) {
                wx.switchTab({
                  url: '../index/index',
                })
              } else if (res.cancel) {
                wx.switchTab({
                  url: '../index/index',
                })
              }
            }
          })

      }
    })



  },



})