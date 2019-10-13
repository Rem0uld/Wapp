const db = wx.cloud.database();
const app = getApp();
Page({
  data: {
    score: null,
    teacherInfo: [],
  },
  choosetech: function(res) {
    console.log(res.currentTarget.dataset.name);
    app.globalData.teacher = res.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../teacher/teacher',
    })
  },

  onLoad: function(options) {
    db.collection('teachers').get({
      success:e=>{
        console.log(e.data)
      }
    })
    



    db.collection('teachers').get({
      success: res => {
        console.log(res.data)
        this.setData({
          teacherInfo: res.data
        })
      } 
    })
    db.collection('userInfo').get({
      success: res => {
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