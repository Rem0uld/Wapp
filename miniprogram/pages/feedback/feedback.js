const db = wx.cloud.database();
const app = getApp();
Page({


  data: {
    imgList: [],
    userInfo: '',
    commentContent: '',
  },

  onLoad: function(options) {
    db.collection('userInfo').get({
      success: e => {
        this.setData({
          userInfo: e.data[0].userInfo
        })
        console.log(e.data[0].userInfo)
      },
      fail: console.error
    })
  },

  submit: function(res) {
    if ((this.data.commentContent == '') && (this.data.imgList.length == 0)) {
      wx.showModal({
        title: '错误',
        content: '请将信息填写完整！',
      })
    } else {
      wx.showLoading({
        title: '提交中',
      })
      for (let i = 0; i < this.data.imgList.length; i++) {
        let item = this.data.imgList[i];
        let suffix = /\.\w+$/.exec(item)[0];
        wx.cloud.uploadFile({
          cloudPath: './feedback/' + this.data.userInfo.nickName + i + suffix,
          filePath: item,
          success: e => {
            console.log(e)
          },
          fail: console.error
        })
      }
      wx.cloud.callFunction({
        name: 'feedback',
        data: {
          name: this.data.userInfo.nickName,
          content: this.data.commentContent,
        },
        success: e => {
          console.log(e)
          wx.hideLoading()
          wx.showToast({
            title: '成功',
            icon:'success'
          })
          wx.reLaunch({
            url: '../me/me',
          })
        },
        fail: console.error
      })
    }
  },

  back: function() {
    wx.navigateBack({
      delta: 1,
    })
  },

  textareaAInput: function(e) {
    this.setData({
      commentContent: e.detail.value,
    })
  },
  viewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  delImg(e) {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除张图片吗？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  chooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
})