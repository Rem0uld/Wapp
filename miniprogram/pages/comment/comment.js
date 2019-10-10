const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
var teachers = [];
var userAvatar='';
var openid = '';
Page({
  data: { 
    userName: '',
    teaInf: {},
    fullStarUrl: '../../images/fullstar.png',
    nullStarUrl: '../../images/nullstar.png',
    score: 5,
    scoreArray: [1, 2, 3, 4, 5],
    scoreText: ['1星', '2星', '3星', '4星', '5星'],
    scoreContent: '',
    commentContent: '未填写评价！'
  },

  changeScore: function(e) { //评分
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

  submit: function(e) { //提交数据到数据库
    wx.cloud.callFunction({ //调用云函数添加数据，避免权限问题
      name: 'add',
      data: {
        id: this.data.teaInf.name,
        name: this.data.userName,
        avatar: userAvatar,
        comment: this.data.commentContent,
        score: this.data.score,
        openid: openid,
      },
      success: e => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 3000,
        })
        wx.reLaunch({
          url: '../teacher/teacher',
        })
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
    if (e.detail.cursor == 0) {
      this.setData({
        commentContent: '未填写评价，默认好评！',
      })
    } else {
      this.setData({
        commentContent: e.detail.value,
      })
    }
  },

  onLoad: function(e) {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: e => {
        
          openid=e.result.openid;
      
      },
      fail: console.error

    })

    db.collection("teacherInfo").get({
      success: res => {
          teachers= res.data[0].teachers; //拿到关于教师数据
        for (let i = 0; i <=teachers.length; i++) {
          if (teachers[i].name == app.globalData.teacher) {
            this.setData({
              teaInf:teachers[i], //筛选出选中的教师数据
            })
            console.log(this.data.teaInf)
          }
        }
      },
    })

    db.collection("userInfo").get({
      success: res => {
        userAvatar=res.data[0].avatarUrl;
        this.setData({
          userName: res.data[0].name,     
        })
      }
    })
  }
})