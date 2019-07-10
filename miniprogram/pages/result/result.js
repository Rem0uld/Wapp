const app = getApp();
const db = wx.cloud.database();
Page({
    data: {
        score: null,
    },

    goIndex: function() {
        wx.switchTab({
            url: '../index/index',
        })
    },

    onLoad: function(options) {

    },
    onReady: function() {
        setTimeout(function(){},1000)
        db.collection('userInfo').where({
            _openid: app.globalData.openid
        }).get({
            success: res => {
                console.log(res.data[0].score)
                this.setData({
                    score: res.data[0].score,
                })
            }
        })
    }

})