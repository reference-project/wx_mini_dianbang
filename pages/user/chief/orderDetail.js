// pages/dianbanggg/orderDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: '',
    order: [],
    id: '',
    credoId:'',
    order:{},

  },
  // 跳转到商品详情
  goProduct: function (e) {
    var that = this
    var id = e.currentTarget.dataset.productid;
    var activityId = e.currentTarget.dataset.activityid;
    wx.navigateTo({
      url: '/pages/index/productDetail?id=' + id + "&activityId=" + activityId
    })
  },
  // 一键复制事件
  copyBtn: function (e) {
    var that = this;
    wx.setClipboardData({
      //准备复制的数据
      data: that.data.order.orderNumber,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var state = options.state
    var orderId = options.id
    that.setData({
      state: state,
      orderId: orderId,
      credoId: options.credoId
    })
    this.getData();
  },
  /**
	 * 获取数据
	 */
  getData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/order/detail', "", {
        orderId: that.data.orderId
      },
      function (res) {
        console.log(res.data)
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          });
          return;
        }
        that.setData({
          order: res.data.order
        })
      }
    )
  },
/**
 * 确认收货
 */
  Confirm:function(e){
    let that = this;
    // var credoId = e.currentTarget.dataset.credoId;
    // debugger;
    app.request(
      app.globalData.grouponUrl + '/api/order/confirm', "", {
        orderId: that.data.orderId,
        // credoId: that.data.credoId
      },
      function (res) {
        console.log(res.data)
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: "确认收货失败",
            icon: 'none',
          });
          return;
        }
        wx.showToast({
          title: "确认收货成功!",
          icon: 'none',
        });
        that.getData();
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/user/chief/myOrder?credoId=' + that.data.credoId
          })
        }, 800)  
       }
    )
  },

})