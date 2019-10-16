// pages/user/success.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popup: false,
    credoId:'',
    activityId:'',
    activity:{},
    scene:'',
    qrcode:'',
  },
  // 前往商品详情
  goDetails:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var activityId = that.data.activityId;
    wx.navigateTo({
      url: '/pages/index/productDetail?id=' + id + "&activityId=" + activityId
    })
  },
  /* 隐藏弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  // 查看保存二维码
  preview(e) {
    var url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
    console.log(options)
    const scene = decodeURIComponent(options.q)
    that.setData({
      credoId: options.credoId,
      activityId: options.activityId,
      scene: scene,
    })
      that.getData();
    that.getQrcode();
  },
  getData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/activity/detail', "", {
        credoId: that.data.credoId,
        activityId: that.data.activityId,
      },
      function (res) {
        console.log(res.data)
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: '系统出错',
            icon: 'none',
          });
          return;
        }
        that.setData({
          activity: res.data.activity
        })

      }

    )
  },
  getQrcode: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/activity-credo/get-qrcode', "", {
        scene: that.data.scene,
      },
      function (res) {
        console.log(res.data)
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: '系统出错',
            icon: 'none',
          });
          return;
        }
        that.setData({
          qrcode: res.data.qrcode
        })

      }

    )
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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