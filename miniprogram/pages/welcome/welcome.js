const db = wx.cloud.database();
const app = getApp();
Page({
  data: {
    avatarUrl: '',
    userInfo: {},
  },
  userLogin: function() {
    wx.getSetting({ //调用接口判断是否登录
      success: res => { //成功调用获取信息API
        console.log('调用getsetting成功');
        wx.getUserInfo({
          success: res => { //调用成功获取用户信息
            console.log('获取信息成功' + res);
            this.setData({ //将用户信息传递给data
              avatarUrl: res.userInfo.avatarUrl,
              userInfo: res.userInfo,
            })
            wx.cloud.callFunction({ //调用云函数，获取用户openid
              name: 'login',
              data: {},
              success: res => { //调用成功
                console.log('云函数调用成功')
              },
              fail: err => {
                console.error(' 调用云函数失败', err)
              }
            })
            db.collection('userInfo').get({ //寻找到对应集合，如果没有记录则添加记录
              success: res => {
                if (res.data.length == 0) {
                  console.log('未找到记录，正在添加');
                  db.collection('userInfo').add({
                    data: {
                      avatarUrl: this.data.avatarUrl,
                      userInfo: this.data.userInfo,
                    }
                  })
                  console.log('用户数据添加成功')

                } else {
                  console.log('已有记录，不添加');
                }
              }
            })
          }
        })
      },
      fail: res => {
        console.log('接口调用失败')
      }
    })
  },

  goIndex: function() { //授权完成跳转到首页
    db.collection('userInfo').get({
      success: res => {
        if (res.data.length == 0) {
          wx.showToast({
            title: '信息变更，请重新注册信息！',
            icon: 'none',
          })
          console.log('未找到记录，正在添加');
          db.collection('userInfo').add({
            data: {
              avatarUrl: this.data.avatarUrl,
              userInfo: this.data.userInfo,
            }
          })
        }
        db.collection('userInfo').doc(res.data[0]._id).get({
          success: res => { //判断数据库中是否有相应openid的注册数据，如果没有则跳转到注册页面
            if ((res.data.name || res.data._class) == undefined) {
              wx.reLaunch({
                url: '../register/register',
              })
            } else {
              wx.reLaunch({ //有相关注册数据，跳转到首页
                url: '../index/index',
              })
            }
          }
        })
      }
    })
  },

  onLoad: function(options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
              })
            }
          })
        }
      }
    })
  }
})