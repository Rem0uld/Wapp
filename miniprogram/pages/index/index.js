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
    userClass: 'null'

  },

  /**
   * 生命周期函数--监听页面加载
   */
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