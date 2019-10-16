var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js')
var qqmapsdk;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    blockName:'',
    province: '',
    city: '',
    area: '',
    items:[],
    credo:{},
    lastCredoId: '',
  },
  // getLocation(){
  //   wx.getLocation({
  //     type:"gcj02",
  //     success: function(res){
  //       console.log(res)
  //       wx.openLocation({
  //         latitude: 'res.latitude',
  //         longitude: 'res.logitude',
  //         scale:18,
  //         success:function(res){
  //           wx.chooseLocation({
  //             success: function(res) {
  //               console.log(res)
  //             },
  //           })
  //         }
  //       })
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("1111111111"+options)
    this.setData({
      lastCredoId: app.globalData.user.lastCredoId,
    });
    if (options.name != null && options.name != '') {
      //设置变量 address 的值
      this.setData({
        blockName: options.name,
        address: options.address,
        area: options.area,
      });
    } else {
    // 获取当前的地理位置
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
            latitude: lati,
            longitude: longi
          },
          success: function (res) {
            that.setData({
              blockName: res.result.address_component.street,
              address: res.result.address,
              area: res.result.address_component.district,
            })
            that.getData();
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
  },
  getData: function () {
    var that = this
    app.request(
      app.globalData.grouponUrl + '/api/credo/query', "", {
        address: that.data.address,
        area: that.data.area,
        id: app.globalData.user.lastCredoId
      },
      function (res) {
        console.log(res.data)
        var data = res.data;
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none'
          });
          return;
        }

        var msgIndex = that.data.items.length;
        res.data.list.forEach(function (value, index, list) {
          var key = "items[" + msgIndex + "]";
          that.setData({
            [key]: value,
          });
          msgIndex++;
        });
        if (res.data.credo != undefined) {
        that.setData({
            credo: res.data.credo,
          // items: res.data.list
        })
        }
      }
    )
  },
  modify: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id;
    app.request(
      app.globalData.grouponUrl + '/api/credo/modify', "", {
        id: id
      },
      function (res) {
        console.log(res.data)
        var data = res.data;
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none'
          });
          return;
        }
        app.globalData.user = data.user;
        wx.navigateTo({
          url: '/pages/index/index'
        })
      }
    )
  },
  gobMap: function(){
    wx.navigateTo({
      url: '/pages/revise/revise'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})