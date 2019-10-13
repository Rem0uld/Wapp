const db = wx.cloud.database();
const app = getApp();
var tag = 0;
var choosed = [];
var answerArrs = []; //正确答案数组

Page({
  data: {
    questions: [], //题库
    tags: 0, //题目标识
    newArr: [], //随机数数组
    cardArr: [], //答题卡数组
    cardIndex: 0, //答题卡序号
  },

  beforeQuestion: function() { //改变tags改变题目
    tag = tag - 1;
    if (tag < 0) {
      wx.showToast({
        title: '已经是第一题！',
        icon: 'none',
        duration: 2000
      })
      tag = 0;
    } else {
      this.setData({
        tags: tag,
      })
    }
  },

  next: function() {
    if (tag >= this.data.questions.length - 1) {
      wx.showToast({
        title: '已经是最后一题！',
        icon: 'none',
        duration: 2000
      })
    } else {
      tag = tag + 1;
      this.setData({
        tags: tag,
      })
    }
  },


  chooseAnswer: function(res) {
    let mTag = this.data.newArr[this.data.tags];
    let index = res.currentTarget.dataset.index;
    let chooseArr = this.data.questions[mTag].options;
    let nowChecked = 'questions[' + mTag + '].options'; //setData改变部分数据
    if (chooseArr[index].checked) return; //选择当前已经选择的返回
    chooseArr.forEach(item => { //遍历选项，将其他选项设置为false（单选）
      item.checked = false
    })
    chooseArr[index].checked = true;
    this.setData({
      [nowChecked]: chooseArr,
    })
    this.data.cardArr.splice(tag, 1, true); //变更选中数组
    var cardarr = this.data.cardArr;
    this.setData({
      cardArr: cardarr //实时更新选中的数组
    })


  },



  cardClick: function(res) {
    const cardIndex = res.currentTarget.dataset.index;
    tag = cardIndex;
    this.setData({
      tags: cardIndex,
      modalName: null,
    })
  },

  showModal(res) { //显示关闭答题卡
    this.setData({
      modalName: res.currentTarget.dataset.target
    })
  },
  hideModal(res) {
    this.setData({
      modalName: null
    })
  },

  //放大图片
  showPic: function(e) {
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    })
  },

  onLoad: function(options) {
    db.collection('questionBank').get({ //获取数据库中的题库，保存到本地
      success: res => {
        this.setData({
          questions: res.data[0].question,
        })
        console.log(this.data.questions);
        var oldArr = [];
        var cardArr = [];
        for (let i = 0; i < this.data.questions.length; i++) {
          oldArr.push(i); //创建一个新的数组用作索引
          cardArr.push(false); //创建答题卡数组
        }
        this.setData({
          cardArr: cardArr,
        }) //将数组保存作为答题卡渲染
        console.log(this.data.cardArr)
        var newArr = [];
        while (oldArr.length) {
          var index = parseInt(Math.random() * oldArr.length);
          newArr = newArr.concat(oldArr.splice(index, 1)) //随机替换旧数组索引，生成新的随机数组
        }
        console.log(newArr);
        this.setData({
          newArr: newArr,
        })
      }
    })
  },
  onUnload: function() {

  }
})