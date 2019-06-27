const db = wx.cloud.database();
const app = getApp();
var tag = 0;
function countDown(that) {
  let sec = that.data.countDownSec;
  let min = that.data.countDownMin;
  if(sec == 0 && min == 0){
      console.log('time out')
      return;
  }
  if(sec == 0){
      var delay = setTimeout(function(){//补秒
          that.setData({
              countDownMin: min - 1,
          })
      },1000)
      sec = 5;
  }
  const time = setTimeout(function(){
      that.setData({
          countDownSec:sec -1,
      })
      countDown(that);
  },1000)
}
Page({
    options: {
        addGlobalClass: true,
    },
    data: {
        countDownSec:59,
        countDownMin:5,
        btntag: 0,//交卷按钮标识
        choosed: [],//选择好的数组
        questions: [],//题库
        tags: 0,//题目标识
        newArr: [], //随机数数组
        cardArr: [],//答题卡数组
        cardIndex: 0,//答题卡序号

    },

    beforeQuestion: function () { //改变tags改变题目
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

    chooseAnswer: function (res) {
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
        this.data.cardArr.splice(tag, 1, true);
        var cardarr = this.data.cardArr;
        this.setData({
            cardArr: cardarr//实时更新选中的数组
        })
        var that = this;
        setTimeout(function () { //设置延时后自动跳转到下一题
            tag = tag + 1;
            if (tag >= that.data.newArr.length) {
                that.setData({
                    btntag: 1,
                })
                tag = that.data.newArr.length - 1;
            } else {
                that.setData({
                    tags: tag,
                })
            }
        }, 600);


    },

    submit: function () {
        this.data.choosed = [];
        var userArr = [];
        for (var i of this.data.newArr) { //将用户所有选择保存到数组中去
            for (let j = 0; j <= 3; j++) {
                if (this.data.questions[i].options[j].checked) {
                    userArr.push(this.data.questions[i].options[j].value)
                }
            }
        }
        this.setData({
            choosed: userArr,
        })
        console.log(this.data.choosed);
    },

    cardClick: function (res) {
        let cardIndex = res.currentTarget.dataset.index;
        console.log(cardIndex);
        tag = cardIndex;
        this.setData({
            tags: cardIndex,
            modalName: null,
        })
    },

    showModal(res) {//显示关闭答题卡
        this.setData({
            modalName: res.currentTarget.dataset.target
        })
    },
    hideModal(res) {
        this.setData({
            modalName: null
        })
    },

    onLoad: function (options) {
        countDown(this);
        db.collection('questionBank').get({//获取数据库中的题库，保存到本地
            success: res => {
                const answerBank = res.data[0].question[0];
                this.setData({
                    questions: res.data[0].question,
                })
                console.log(this.data.questions);
                var oldArr = [];
                var cardArr = [];
                for (let i = 0; i < this.data.questions.length; i++) {
                    oldArr.push(i); //创建一个新的数组用作索引
                    cardArr.push(false);//创建答题卡数组
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
})
