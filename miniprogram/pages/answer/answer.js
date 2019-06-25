const db = wx.cloud.database();
const app = getApp();
var tag = 0;
Page({
    options: {
        addGlobalClass: true,
    },
    data: {
        choosed: [],
        questions: [],
        tags: 0,
        newArr: [], //随机数数组
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

    nextQuestion: function() {
        tag = tag + 1;
        if (tag >= this.data.newArr.length) {
            console.log("最后一题");
            tag = this.data.newArr.length-1;
        } else {
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
        if (tag < this.data.newArr.length){
            this.data.choosed.push(chooseArr[index].value);//将选中的数据保存到数组中去
        };
        var that = this;
        setTimeout(function() { //设置延时后自动跳转到下一题
            tag = tag + 1;
            if (tag >= that.data.newArr.length) {
                console.log("最后一题");
                tag = that.data.newArr.length-1;
            } else {
                that.setData({
                    tags: tag,
                })
            }
        }, 700)
        
        
    },

    submit:function(){
        console.log(this.data.choosed);
    },

    onLoad: function(options) {
        db.collection('questionBank').get({
            success: res => {
                const answerBank = res.data[0].question[0];
                this.setData({
                    questions: res.data[0].question,
                })
                console.log(this.data.questions);
                var oldArr = [];
                for (let i = 0; i < this.data.questions.length; i++) {
                    oldArr.push(i); //创建一个新的数组用作索引
                }
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