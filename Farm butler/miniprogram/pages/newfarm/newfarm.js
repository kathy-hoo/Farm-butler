// pages/newfarm/newfarm.js
Page({
  data: {
    field:[],
  },
  timestamp(date){
    return new Date(date).getTime()
  },
  onLoad: function (options) {
    const that = this;
    if (options.id) {
      const db = wx.cloud.database();
      db.collection("fields").doc(options.id).get({
        success: res => {
          that.setData({
            field : res.data
          })
          // console.log(field)
        }, fail: err => {
          console.log(err)
        }
      })
    }
  },
  formSubmit: function (e) {
    console.log(e)
    const db = wx.cloud.database()
    let field = e.detail.value
    if (field.id == "") {
      this.add(db, field)  
    } else {
      this.update(db, field)  
    }
  }, 
  add: function (db, field) {
    db.collection("fields").add({
      data: {
        fieldname: field.fieldname,
        fieldplant: field.fieldplant,
      }, success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
        wx.navigateTo({
          url: '../farm/farm',
        })
      }, fail: err => {
        wx.showToast({
          title: '新增失败',
        })
      }
    })
  }, 
  update: function (db, field) {
    // console.log(field);
    db.collection("fields").doc(field.id).update({
      data: {
        fieldname:field.fieldname,
        fieldplant:field.fieldplant,
      }, success: res => {
        wx.showToast({
          title: '修改记录成功',
        })
        wx.navigateTo({
          url: '../farm/farm',
        })
      }, fail: err => {
        wx.showToast({
          title: '修改失败',
        })
      }
    })
  },
})