const db = wx.cloud.database();
const app = getApp();
var tag = 0;
var arr = [];
var ansArr=[];
Page({
  data: {
    question: [],
    tags: 0,
    answer: '',
    choose:[],
    ansArr:[],

  },

  before: function(e) {
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

  next: function(e) {

    tag = tag + 1;
    if (tag > this.data.question.length - 1) {
      wx.showToast({
        title: '已经是最后一题！',
        icon: 'none',
        duration: 2000
      })
      tag = this.data.question.length - 1
    } else {
      this.setData({
        tags: tag
      })
    }
  },

  choose: function(res) {
    console.log(ansArr)
    arr.splice(this.data.tags,1,true)
    this.setData({
      choose:arr
    })
    console.log(this.data.choose)
    
    var index = res.currentTarget.dataset.index; //本次点击的下标
    var touch = res.currentTarget.dataset.value
    this.setData({
      answer: this.data.question[tag].answer,
    })

    let mTag = this.data.tags;
    let chooseArr = this.data.question[mTag].options;
    let nowChecked = 'question[' + mTag + '].options'; //setData改变部分数据
    if (chooseArr[index].checked) return; //选择当前已经选择的返回
    chooseArr.forEach(item => { //遍历选项，将其他选项设置为false（单选）
      item.checked = false
    })
    chooseArr[index].checked = true;
    this.setData({
      [nowChecked]: chooseArr,
    })
    console.log(res)
    console.log(this.data.question[mTag].options)

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
    
    db.collection('questionBank').get({
      success: e => {
        this.setData({
          question: e.data[0].question
        })
        for (let i = 0; i < this.data.question.length;i++){
            arr.push(false);
            ansArr.push(e.data[0].question[i].answer)
        }
        this.setData({
          ansArr:ansArr,
        })
      },
      fail: console.error
    })

    
  },

})