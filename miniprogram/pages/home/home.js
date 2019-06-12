Page({

  data: {
      pageCur:'index'
  },
  NavChange:function(e){
    this.setData({
      pageCur: e.currentTarget.dataset.cur
    })

  },

  onShareAppMessage: function () {

  }
})