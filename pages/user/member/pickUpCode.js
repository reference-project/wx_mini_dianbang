// pages/user/member/pickUpCode.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    credoId:'',
    obtainCode:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      credoId: options.credoId,
    });
  },
  setCode:function(e){
    this.setData({
      obtainCode: e.detail.value
    })
  },
  goSubmit: function (e) {
    var that = this
    var credoId = that.data.credoId;
    var obtainCode = that.data.obtainCode;
    if (that.data.obtainCode == null || that.data.obtainCode == '') {
      wx.showToast({
        title: "请输入提货码",
        icon: 'none',
      });
      return;
    }
      wx.navigateTo({
        url: '/pages/user/member/pickUp?credoId=' + credoId + "&obtainCode=" + obtainCode
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