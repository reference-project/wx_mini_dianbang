// pages/user/chief/myBank.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userBank:0,
  },
  addBankCard:function (){
    wx.navigateTo({
      url: '/pages/user/chief/addBank'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getBank();
  },
  //获取团长默认银行卡
  getBank: function () {
    var that = this;
    app.request(
      app.globalData.grouponUrl + '/api/withdraw/get', "", {
        bankId: 0,
      },
      function (res) {
        console.log(res.data);
        var data = res.data;
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none'
          });
          return;
        }
        that.setData({
          userBank: res.data.userBank,
        })
        console.log(that.data.userBank)
      }
    )
  },
  gowithdraw:function(){
    wx.navigateTo({
      url: '/pages/user/chief/withdrawals?id=' + this.data.userBank.id
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