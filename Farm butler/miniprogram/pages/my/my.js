// pages/my/my.js
var app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    activityTotal: 0,
    infoStatus: 0,
    infoStatusToDesc: app.globalData.personInfoStatus,
    list:[{
      page:'../information/information',
      img:'/images/mypage/iconMine.png',
      title:'个人信息'
    },{
      page: '../message/message',
      img: '/images/mypage/iconMsg.png',
      title: '消息'
    },{
      page: '../setting/setting',
      img: '/images/mypage/iconset.png',
      title: '设置'
    }]
  },
  onLoad: function (options) {
    const that = this;
    if (app.globalData.bindInfo) {
      const { total, status } = app.globalData.bindInfo
      this.setData({
        activityTotal: total,
        infoStatus: +status,
      })
    } else {
      app.bindInfoReadyCallback = res => {
        console.log(res)
        const { total, status } = res
        this.setData({
          activityTotal: total,
          infoStatus: +status,
        })
      }
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getUserInfo({
      success(res) {
        app.globalData.userInfo = res.userInfo;
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  onShow: function () {
    const that = this
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
})