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

  },


  onLoad: function (options) {
    db.collection('questionBank').get({
      success:res=>{
        const answerBank = res.data[0].question[0];
        console.log(res.data)
        this.setData({
          title:answerBank.title,
          options:answerBank.options,
          answer:answerBank.answer
        })
        console.log(this.data.options)
      }
    })



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