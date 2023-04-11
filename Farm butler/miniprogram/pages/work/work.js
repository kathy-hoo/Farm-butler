// pages/work/work.js
var util = require('../../utils/util.js');
Page({
  data: {
    tabs: ["全部","未开始", "进行中",  "已完成"],
    activeIndex: "0",
    works:[],
    time:''
  },
  addwork() {
    wx.navigateTo({
      url: '../newwork/newwork'
    })
  },
  onLoad: function () {
    const db = wx.cloud.database();
    this.db = db;
    db.collection("works").get({
      success: res => {
        this.setData({
          works: res.data
        })
      }, fail: err => {
        wx.showToast({
          icon: "none",
          title: '查询记录失败',
        })
      }
    })
  },
  del: function (e) {
    let id = e.currentTarget.dataset.id
    const db = wx.cloud.database();
    db.collection("works").doc(id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        //this.onLoad()
      }, fail: err => {
        wx.showToast({
          title: '删除失败',
        })
      }
    })
    console.log(id)
  },
  timestamp(date) {
    return new Date(date).getTime()
  },
  tabClick: function (e) {
    const that = this;
    var TIME = util.formatTime(new Date())
    const timestamp = this.timestamp(TIME);
    console.log(timestamp);
    const activeIndex = e.currentTarget.id;
    that.setData({
      time: TIME,
      activeIndex: activeIndex
    });
    if (activeIndex == 0) {
      that.db.collection('works').get({
        success(res) {
          console.log(res.data)
          that.setData({
            works: res.data
          })
        }
      })
    }
    if (activeIndex==1){
      const _ = that.db.command
      that.db.collection('works').where({
        workstart: _.gt(timestamp)
      }).get({
        success(res) {
          console.log(res.data)
          that.setData({
            works: res.data
          })
        }
      })
    }
    if (activeIndex == 2) {
      const _ = that.db.command
      that.db.collection('works').where({
        workstart: _.lt(timestamp),
        workend: _.gt(timestamp)
      }).get({
        success(res) {
          console.log(res.data)
          that.setData({
            works: res.data
          })
        }
      })
    }
    if (activeIndex == 3) {
      const _ = that.db.command
      that.db.collection('works').where({
        workend: _.lt(timestamp),
      }).get({
        success(res) {
          console.log(res.data)
          that.setData({
            works: res.data
          })
        }
      })
    }
  }
})