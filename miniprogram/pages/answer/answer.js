const db = wx.cloud.database();
const app = getApp();
Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    title: '',
    options: [],
    answer: '',
    questions:[],

  },
  onLoad: function(options) {
    db.collection('questionBank').get({
      success: res => {
        
        const answerBank = res.data[0].question[0];
        this.setData({
          title: answerBank.title,
          options: answerBank.options,
          answer: answerBank.answer,
          questions:res.data
        })
        console.log(this.data.questions)

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