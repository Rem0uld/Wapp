const db = wx.cloud.database();
Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    avatarUrl: '',
    userInfo: {},
    userName: 'null',
    userClass: 'null',
    elements: [{
        title: '测试',
        name: 'answer',
        icon: 'question',
        color: 'blue'
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
    db.collection('userInfo').get({
      success: res => {
        console.log(res)
        this.setData({
          userInfo: res.data[0].userInfo,
          avatarUrl: res.data[0].avatarUrl,
          userName: res.data[0].name,
          userClass: res.data[0]._class,
        })
      }
    })
  },
})