// pages/farm/farm.js
Page({
  data: {
    imgUrls: [
      '/images/farmpage/swiper1.jpg',
      '/images/farmpage/swiper2.jpg',
      '/images/farmpage/swiper3.jpg'
    ],
    fields:[],
    height: ''
  },
  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection("fields").get({
      success: res => {
        console.log(res)
        this.setData({
          fields: res.data
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
    db.collection("fields").doc(id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        this.onLoad()
      }, fail: err => {
        wx.showToast({
          title: '删除失败',
        })
      }
    })
    console.log(id)
  },
  update: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../newfarm/newfarm?id='+id,
    })
  },
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; 
    var imgh = e.detail.height;
    var imgw = e.detail.width;
    var swiperH = winWid * imgh / imgw + "px"
    this.setData({
      height: swiperH
    })
  },
  addfarm() {
    wx.navigateTo({
      url: '../newfarm/newfarm'
    })
  },
})