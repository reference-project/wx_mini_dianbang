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
    credo:{},
  },
  // 跳转到商品详情
  goProduct: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.productid;
    var activityId = e.currentTarget.dataset.activityid;
    wx.navigateTo({
      url: '/pages/index/productDetail?id=' + id + "&activityId=" + activityId
    })
  },
  // 跳转到申请售后
  goRefund: function () {
    wx.navigateTo({
      url: '/pages/user/member/applyRefund'
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
    var that = this;
    var state = options.state;
    var orderId = options.id;
    var credoId = options.credoId;
    that.setData({
      state: state,
      orderId: orderId,
      credoId: credoId
    });
    this.getData();
  },

  /**
	 * 获取数据
	 */
  getData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/order/detail', "", {
        orderId: that.data.orderId,
      },
      function (res) {
        console.log(res.data);
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          });
          return;
        }
        that.setData({
          order: res.data.order,
          credo: res.data.order.credo
        })
      }
    )
  },


})