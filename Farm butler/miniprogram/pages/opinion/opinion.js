// pages/opinion/opinion.js
Page({
  data: {
    opinion:[]
  },
  inputs: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    if (len > this.data.max) return;
    this.setData({
      currentWordNumber: len   
    });
  }, 
  bindFormSubmit: function (e) {
    const db = wx.cloud.database()
    let opinion = e.detail.value;
    db.collection("opinions").add({
      data: {
        text: opinion.textword
      }, success: res => {
        wx.showToast({
          title: '提交成功',
        })
      }, fail: err => {
        wx.showToast({
          title: '提交失败',
        })
      }
    })
  },
})