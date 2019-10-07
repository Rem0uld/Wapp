const app = getApp();
const db = wx.cloud.database();
const _ = db.command
Page({

  data: {
    openid: '',
    userName: '',
    userAvatar: '',
    teachers: [],
    teaInf: {},
    fullStarUrl: '../../images/fullstar.png',
    nullStarUrl: '../../images/nullstar.png',
    score: 0,
    scoreArray: [1, 2, 3, 4, 5],
    scoreText: ['1星', '2星', '3星', '4星', '5星'],
    scoreContent: '',
    commentContent: '',
  },

  changeScore: function(e) {//评分
    var that = this;
    var num = 0;
    var touchX = e.touches[0].pageX;
    var starMinX = 90;
    var starWidth = 20;
    var starLen = 10;
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

  submit: function(e) {//提交数据到数据库
    wx.cloud.callFunction({//调用云函数添加数据，避免权限问题
      name: 'add',
      data: {
        id: this.data.teaInf.name,
        name: this.data.userName,
        avatar: this.data.userAvatar,
        comment: this.data.commentContent,
        openid: this.data.openid
      },
      success: e => {
        console.log(e)
      },
      fail: e => {
        console.log(e)
      }
    })
  },

  back: function() {
    wx.navigateBack({
      delta: 1,
    })
  },

  textareaAInput: function(e) {
    this.setData({
      commentContent: e.detail.value,
    })
  },

  onLoad: function(e) {
    console.log(app.globalData.openid)
    db.collection("teacherInfo").get({
      success: res => {
        this.setData({
          teachers: res.data[0].teachers, //拿到关于教师数据
        })
        for (let i = 0; i <= this.data.teachers.length; i++) {
          if (this.data.teachers[i].name == app.globalData.teacher) {
            this.setData({
              teaInf: this.data.teachers[i], //筛选出选中的教师数据
            })
            console.log(this.data.teaInf)
          }
        }
      },
    })

    db.collection("userInfo").where({//获取评论者数据
      _openid: app.globalData.openid,
    }).get({
      success: res => {
        this.setData({
          userName: res.data[0].name,
          userAvatar: res.data[0].avatarUrl,
        })
      }
    })
  }
})