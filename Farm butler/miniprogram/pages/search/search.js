// pages/search/search.js
var app = getApp();
Page({
  data: {
    search:'',
  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value.keyword;
    console.log(formData);
    wx.showLoading({
      title: '搜索中',
      icon: 'loading'
    })
    const db = wx.cloud.database();
    db.collection("fields").where({
      fieldplant: formData
    }).get({
      success: res => {
        if (res.data.length == 0) {
          wx.showToast({
            icon: "none",
            title: '没有搜索结果',
          })
        }
        this.setData({
          result: res.data,
        })
      }, fail: err => {
        wx.showToast({
          icon: "none",
          title: '没有搜索结果',
        })
      }, complete() {
        wx.hideLoading();
      }
    })
  },
  onLoad: function () {
  },
  clear_input(e) {
    this.setData({
      search:''
    });
  }, 
  inputfunc(e) {
    this.setData({
      search: e.detail.value
    });
  }
});
