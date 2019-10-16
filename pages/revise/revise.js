var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
var qqmapsdk;
Page({
  data: {
    latitude: 0,//地图初次加载时的纬度坐标
    longitude: 0, //地图初次加载时的经度坐标
    name: "" //选择的位置名称
  },
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'cRthegDaFQ4P4FqxsORCXD7YdMGeoRi8'
    });

    this.moveToLocation();
  },
  //移动选点
  moveToLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        console.log(res.address);
        //选择地点之后返回到原来页面
        that.getRevise(res.latitude, res.longitude);
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },
  getRevise: function (latitude, longitude) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var lati = res.latitude
        var longi = res.longitude

        // 实例化API核心类
        var demo = new QQMapWX({
          key: 'B2ABZ-SIDKS-WD2O3-6CJ2U-CDZOT-U3FKF' // 申请的key
        })
        // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            that.setData({
              blockName: res.result.address_component.street,
              address: res.result.address,
            })
            wx.navigateTo({
              url: "/pages/user/chief/select?name=" + res.result.formatted_addresses.recommend + "&address=" + res.result.address + "&area=" + res.result.address_component.district
            });
            console.log(res);
            console.log(res.result.address_component.city)
          },

          fail: function (res) {
            console.log(res);
          }
        })
      }
    })
  }
});