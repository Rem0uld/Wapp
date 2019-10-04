const app = getApp();
const db = wx.cloud.database();
Page({

  data: {
    teachers: [],
    teaInf: {},
  },

  onLoad: function(options) {
    db.collection('teacherInfo').get({
      success: res => {
        this.setData({
          teachers: res.data[0].teachers, //拿到关于教师数据
         })
        for (let i = 0; i <= this.data.teachers.length; i++) {
          if (this.data.teachers[i].name == app.globalData.teacher) {
            this.setData({
              teaInf: this.data.teachers[i],
            })
          }
        }
      }
    })




  },



})