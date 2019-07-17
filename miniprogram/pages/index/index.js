const db = wx.cloud.database();
const app = getApp();
Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    avatarUrl: '',
    userInfo:{},
    userName: 'null',
    userClass: 'null',
    elements:[
      {
        title:'测试',
        name:'answer',
        icon:'question',
        color:'blue'
      },
      {
        title: '预约',
        name: 'order',
        icon: 'like',
        color: 'red'
      },
      {
        title: '练习',
        name: 'exercise',
        icon: 'copy',
        color: 'cyan'
      },
      {
        title: '关于',
        name: 'about',
        icon: 'settings',
        color: 'pink'
      },
    ]

  },

  onLoad: function(options) {
    db.collection('userInfo').where({
      _openid: app.globalData.openid,
    }).get({
      success: res => {
        db.collection('userInfo').doc(res.data[0]._id).get({
          success: res => {
           this.setData({
            userInfo:res.data.userInfo,
            avatarUrl:res.data.avatarUrl,
            userName:res.data.name,
            userClass:res.data._class,
           })
            
          }
        })
      }
    })
  },

  
})