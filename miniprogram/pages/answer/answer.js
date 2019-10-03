const db = wx.cloud.database();
const app = getApp();
var tag = 0;
function countDown(that) {
  let sec = that.data.countDownSec;
  let min = that.data.countDownMin;
  if (sec == 0 && min == 0) {
    console.log('time out')
    wx.showModal({
      title: '失败',
      content: '未在指定时间内交卷，考试失败！',
      showCancel: false,
      success: res => {
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
    return;
  }
  if (min <= 1) {
    that.setData({
      textColor: 'red',
    })
  }
  if (sec == 0) {
    var delay = setTimeout(function() { //补秒
      that.setData({
        countDownMin: min - 1,
      })
    }, 1000)
    sec = 10;
  }
  const time = setTimeout(function() {
    if (that.data.subTag) {
      console.log('stop')
      return
    }
    that.setData({
      countDownSec: sec - 1,
    })
    countDown(that);
  }, 1000)
}


Page({
  data: {
    textColor: 'blue',
    countDownSec: 10,
    countDownMin: 2,
    choosed: [], //选择好的数组
    questions: [], //题库
    tags: 0, //题目标识
    newArr: [], //随机数数组
    cardArr: [], //答题卡数组
    cardIndex: 0, //答题卡序号
    answerArr: [], //正确答案数组
    subTag: false, //设置提交状态，防止提交后继续倒计时
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

  chooseAnswer: function(res) {
    console.log(tag);
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
    this.data.cardArr.splice(tag, 1, true);//变更选中数组
    var cardarr = this.data.cardArr;
    this.setData({
      cardArr: cardarr //实时更新选中的数组
    })
    console.log(this.data.cardArr)
    var that = this;
    setTimeout(function() { //设置延时后自动跳转到下一题
      tag = tag + 1;
      if (tag >= that.data.newArr.length) {
        tag = that.data.newArr.length - 1;
      } else {
        that.setData({
          tags: tag,
        })
      }
    }, 500);
  }, 

  submit: function() {
    var cardarr = this.data.cardArr;
    var that = this;
    this.data.choosed = [];
    var all = 0;
    var userArr = [];
    var answerArr = [];
    for (let i = 0; i <= cardarr.length; i++) {
      if (cardarr[i] == true) {
        all += 1;
      }
    }
    if (all == this.data.questions.length) {
      wx.showLoading({
        title: '提交中..',
        mask: true,
      })
      for (var i of this.data.newArr) {
        answerArr.push(this.data.questions[i].answer);
        for (let j = 0; j <= 3; j++) {
          if (this.data.questions[i].options[j].checked) {
            userArr.push(this.data.questions[i].options[j].value)
          }
        }
      }
      this.setData({
        choosed: userArr,
        answerArr: answerArr,
      })
      console.log(this.data.choosed);
      console.log(this.data.answerArr);
      wx.cloud.callFunction({
        name: 'score',
        data: {
          choosed: userArr,
          answerArr: answerArr,
        },
        success: res => {
          app.globalData.score = res.result;
          console.log('global' + app.globalData.score);
          db.collection('userInfo').where({
            _openid: app.globalData.openid,
          }).get({
            success: res => {
              db.collection('userInfo').doc(res.data[0]._id).update({
                data: {
                  score: app.globalData.score
                }
              })
            }
          })
          setTimeout(function() {
            wx.hideLoading();
          }, 1000);
          tag = 0;
          wx.reLaunch({
            url: '../result/result',
          })
          that.setData({
            subTag: true,
          })
        } 
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请将所有题目答完后交卷！',
      })
    }
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

  onLoad: function(options) {
    console.log(this.data.tags)
    countDown(this); //初始化倒计时
    db.collection('questionBank').get({ //获取数据库中的题库，保存到本地
      success: res => {
        // const answerBank = res.data[0].question[0];
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
  onUnload:function(){
    this.setData({
      subTag:true,
    })
  }
})