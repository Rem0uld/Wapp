const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    status: true,
    comment: [],
    teachers: [],
    teaInf: {},
    swiperList: [{
      id: 0,
      url: ''
    }, {
      id: 1,
      url: '',
    }, {
      id: 2,
      url: ''
    }],
  },

  addComment: function(res) {
    wx.navigateTo({
      url: '../comment/comment',
    })

  },

  order: function(res) {
    const that = this
    wx.showModal({
      title: '确认信息',
      content: '是否确认预约？',
      success(res) {
        if (res.confirm) {
          that.setData({
            status: false,
          })
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })

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
              teaInf: this.data.teachers[i], //筛选出选中的教师数据
            })
            this.setData({
              swiperList: [{
                id: 0,
                url: this.data.teaInf.pic
              }, {
                id: 1,
                url: this.data.teaInf.pic2
              }, {
                id: 2,
                url: this.data.teaInf.pic3
              }],
            })
            db.collection('comment').doc(this.data.teaInf.name).get({
              success: e => {
                this.setData({ //获取相应评论
                  comment: e.data.comment
                })
              }
            })
          }
        }
      }
    })
  },



})