const app =getApp();
const db = wx.cloud.database();
Page({

  data: {
    teachers:[],
  },

  onLoad: function (options) {
    db.collection('teacherInfo').get({
      success:res=>{
        this.setData({
          teachers: res.data[0].teachers,//拿到关于教师数据
        })
      }
    })





  },

  

})