const db = wx.cloud.database();
const app = getApp();
var tag = 0;
Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    questions:[],
    tags:0,
    newArr:[],
  },
  beforeQuestion:function(){
    tag = tag - 1;
    this.setData({
      tags:tag,
    })
    console.log(this.data.tags);
  },

  nextQuestion:function(){
    tag = tag + 1;
    this.setData({
      tags:tag,
    })
    console.log(this.data.tags);
  },

  test:function(){
    
     


  },



  onLoad: function(options) {
    db.collection('questionBank').get({
      success: res => {
        const answerBank = res.data[0].question[0];
        this.setData({
          questions:res.data[0].question,
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
    var oldArr = [0, 1, 2, 3, 4, 5, 6, 7];
    var newArr = [];
    while (oldArr.length) {
      var index = parseInt(Math.random() * oldArr.length);
      newArr = newArr.concat(oldArr.splice(index, 1))
    }
    console.log(newArr);
    this.setData({
      newArr:newArr,
    })

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