// pages/information/information.js
Page({
  data: {
    information:[]
  },
  onLoad: function () {
    const db = wx.cloud.database()
    db.collection("informations").get({
      success: res => {
        console.log(res)
        this.setData({
          information: res.data[0]
        })
      }, fail: err => {
        console.log(err)
      }
    })
  },
  formSubmit: function (e) {
    let information = e.detail.value
    const db = wx.cloud.database()
    if (information.id == "") {
      this.add(db, information)  
    } else {
      this.update(db, information) 
    }
  },
  add: function (db, information) {
    db.collection("informations").add({
      data: {
        name: information.name,
        age: information.age,
        phone: information.phone,
        email: information.email
      }, success: res => {
        wx.showToast({
          title: '提交信息成功',
        })
        wx.navigateTo({
          url: '../farm/farm',
        })
      }, fail: err => {
        wx.showToast({
          title: '提交信息失败',
        })
      }
    })
  }, 
  update: function (db, information) {
    db.collection("informations").doc(information.id).update({
      data: {
        name: information.name,
        age: information.age,
        phone:information.phone,
        email:information.email
      }, success: res => {
        wx.showToast({
          title: '提交信息成功',
        })
      }, fail: err => {
        wx.showToast({
          title: '提交信息失败',
        })
      }
    })
  },
})