const db = wx.cloud.database();
const app = getApp();
Page({
  data: {},
  formSubmit: function(res) {
    console.log(res);
    const userValue = res.detail.value;
    if ((userValue.userClass && userValue.userName && userValue.userPhone && userValue.userNumber) == '') {
      wx.showModal({
        title: '错误',
        content: '请将所有信息填写完整！',
      })
    } else {
      wx.showModal({
        title: '确认信息',
        content: '请确认所有信息是否正确，一但提交无法更改！',
        success: res => {
          if (res.confirm) {
            db.collection('userInfo').where({
              _openid: app.globalData.openid,
            }).get({
              success: res => {
                wx.showLoading({
                  title: '提交中',
                  mask: true,
                })
                db.collection('userInfo').doc(res.data[0]._id).update({
                  data: {
                    name: userValue.userName,
                    _class: userValue.userClass,
                    number: userValue.userNumber,
                    phone: userValue.userPhone,
                    score:0,
                    order:{
                      tea:'',
                      place:'',
                      time:'',
                    }
                  }
                })
                setTimeout(function() {
                  wx.hideLoading()
                }, 2000)
                wx.reLaunch({
                  url: '../index/index',
                })
              }
            })
          } else if (res.cancel) {
            return;
          }
        }
      })
    }
  }
})