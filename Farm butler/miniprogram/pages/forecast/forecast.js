// miniprogram/pages/forecast/forecast.js
var app = getApp()
var day = ["今天", "明天", "后天"];
Page({
  data: {
    day: day,
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this

    that.getLocation();
  },

  //获取经纬度方法
  getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("lat:" + latitude + " lon:" + longitude);

        that.getCity(latitude, longitude);
      }
    })
  },

  //获取城市信息
  getCity: function (latitude, longitude) {
    var that = this
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var params = {
      ak: "gG1MlBucwjXYL87cNm6zsp04495FGzGv",
      output: "json",
      
      location: latitude + "," + longitude
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        console.log(res)
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;

        that.setData({
          city: city,
          district: district,
          street: street,
        })

        var descCity = city.substring(0, city.length - 1);
        that.getWeahter(descCity);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //获取天气信息
  getWeahter: function (city) {
    var that = this
    var url = "https://free-api.heweather.com/v5/weather"
    var params = {
      city: city,
      key: "894fc2a749104d679fa022c3e71afe83"
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        console.log(res)
        var tmp = res.data.HeWeather5[0].now.tmp;
        var txt = res.data.HeWeather5[0].now.cond.txt;
        var code = res.data.HeWeather5[0].now.cond.code;
        var qlty = res.data.HeWeather5[0].aqi.city.qlty;
        var dir = res.data.HeWeather5[0].now.wind.dir;
        var sc = res.data.HeWeather5[0].now.wind.sc;
        var hum = res.data.HeWeather5[0].now.hum;
        var fl = res.data.HeWeather5[0].now.fl;
        var daily_forecast = res.data.HeWeather5[0].daily_forecast;
        that.setData({
          tmp: tmp,
          txt: txt,
          code: code,
          qlty: qlty,
          dir: dir,
          sc: sc,
          hum: hum,
          fl: fl,
          daily_forecast: daily_forecast
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
  // getWeahter: function (city) {
  //   var that = this
  //   var url = 'https://free-api.heweather.net/s6/weather'
  //   var params = {
  //     location: city,
  //     key: "3149d3adc1c349e38076c45f8d7ad021"
  //   }
  //   wx.request({
  //     url: url,
  //     data: params,
  //     success: function (res) {
  //       console.log(res)
  //       var date = res.data.HeWeather6[0].daily_forecast[0].date;
  //       var location = res.data.HeWeather6[0].basic.location;
  //       that.setData({
  //         date: date,
  //         location: location
  //       })
  //     },

  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // }
  
})