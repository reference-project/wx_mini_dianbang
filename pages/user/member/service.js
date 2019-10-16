// pages/user/service.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  call(e) {
    var that = this;
      wx.makePhoneCall({
        phoneNumber: that.data.phone,
    
      })
    console.log(phoneNumber);
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
    this.getData()
  },
  getData: function () {
    var that = this
    app.request(
      app.globalData.grouponUrl  + '/api/params/service', "",
      {
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
        that.setData({
          pic: res.data.pic,
          phone: res.data.phone
        })
      }

    )
  },
   // 
  /**
   * 获取数据
   */
  // 
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