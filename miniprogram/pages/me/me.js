var db = wx.cloud.database();
var app = getApp();
Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    avatarUrl: '',
    nickName: '',
    score:'',
    order:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { //通过openid获取到数据库中的用户信息
    db.collection('userInfo').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          avatarUrl: res.data[0].avatarUrl,
          nickName: res.data[0].userInfo.nickName,
        })

      }
    })


  },
  goAbout: function() {
      wx.navigateTo({
        url: '../about/about',
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})