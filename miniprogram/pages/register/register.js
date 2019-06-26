// pages/register/register.js
const db = wx.cloud.database();
const app = getApp();
Page({
  data: {
    // StatusBar: app.globalData.StatusBar,
    // CustomBar: app.globalData.CustomBar,
  },
  formSubmit: function (res) {
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
                  mask:true,
                })
                db.collection('userInfo').doc(res.data[0]._id).update({
                  data: {
                    name: userValue.userName,
                    _class: userValue.userClass,
                    number: userValue.userNumber,
                    phone: userValue.userPhone,
                  }
                })
                setTimeout(function () {
                  wx.hideLoading()
                }, 2000)

                wx.reLaunch({
                  url: '../index/index',
                })


              }
            })
          }else if(res.cancel){
            return;
          }

        }
      })

    }


  },


  formReset: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})