// pages/newwork/newwork.js
var that ;
Page({
  data: {
    index: 0,
    reply1:true,
    reply2:false,
    reply3:true,
    reply4:false,
    reply5: true,
    reply6: false,
    work:[],
    array: [],
    count: 0
  },
  bindPickerChange(e) {
    this.setData({
      reply1:false,
      reply2:true,
      index: e.detail.value
    })
  },
  bindDateChange1(e) {
    this.setData({
      reply3: false,
      reply4: true,
      date1: e.detail.value
    })
  },
  bindDateChange2(e) {
    this.setData({
      reply5: false,
      reply6: true,
      date2: e.detail.value
    })
  },
  formSubmit: function (e) {
    const db = wx.cloud.database()
    let work = e.detail.value
    const that = this;
    console.log({
      workname: work.workname,
      workfield: that.data.array[that.data.index]['fieldname'],
      workstart_date: work.workstart,
      workend_date: work.workend,
      workstart: that.timestamp(work.workstart),
      workend: that.timestamp(work.workend)
    })
    db.collection("works").add({
      data: {
        workname: work.workname,
        workfield: that.data.array[that.data.index]['fieldname'],
        workstart_date: work.workstart,
        workend_date: work.workend,
        workstart: that.timestamp(work.workstart),
        workend: that.timestamp(work.workend)
      }, success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
        wx.navigateBack({
          url: '../work/work',
        })
      }, fail: err => {
        wx.showToast({
          title: '新增失败',
        })
      }
    })
  },
  timestamp(date) {
    return new Date(date).getTime()
  },
  onLoad: function (options) {
    const that = this;
    const db = wx.cloud.database();
    if (options.id) {
      db.collection("works").where({
        _id: options.id
      }).get({
        success: res => {
          that.setData({
            work: res.data
          })
          console.log(work)
        }, fail: err => {
          console.log(err)
        }
      })
    }
    db.collection("fields").where({
      _id: options.id
    }).get({
      success: res => {
        that.setData({
          array: res.data
        })
      }, fail: err => {
        console.log(err)
      }
    })
  },
})