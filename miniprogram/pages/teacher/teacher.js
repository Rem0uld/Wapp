const app = getApp();
const db = wx.cloud.database();
var id = '';
var teachers = [];
var orderName = '';
var infomation='';
Page({
  data: {
    modalName: null,
    place: [],
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

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  order: function(res) {
    this.setData({
      modalName: 'bottomModal',
    })
  },

  change:function(e){
    console.log(e.place)
    infomation = e;
  },

  submit:function(e){


  },

  onLoad: function(options) {
    db.collection('userInfo').get({
      success: e => {
        id = e.data[0]._id;
        // if (e.data[0].order != '') {
        //   this.setData({
        //     status: false
        //   })
        // }
      }
    })
    db.collection('teacherInfo').get({
      success: res => {
        teachers = res.data[0].teachers; //拿到关于教师数据
        for (let i = 0; i <= teachers.length; i++) {
          if (teachers[i].name == app.globalData.teacher) {
            this.setData({
              teaInf: teachers[i], //筛选出选中的教师数据
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
    db.collection('place').get({
      success: e => {
        this.setData({
          place: e.data[0].place
        })
      },
      fail: console.error
    })

  },



})