// pages/user/member/applyRefund.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: ['仅退款', '退货退款'],
    reason: ['多拍/拍错/不想要', '商品质量问题', '商品描述不符', '卖家发错货','收到商品少件或破损','其他'],
    content:'在店帮购买的商品，支持“7天退换货”服务。个别商品（例如，短效期的海外食品、贴身使用的内衣物等）可能不享有退货政策，请留意商品页面上的特殊说明；',
    money:'',
    pic:'',
    picUrl:"",
  },
  bindRegionChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindModeChange:function(e){
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      item: e.detail.value
    })
  },
  // 上传凭证
  uploadPic:function (){
    let that = this;
    app.chooseImage(function (data) {
      that.setData({
        picUrl: app.globalData.imgAccessUrl + data.saveName,
        pic: data.saveName
      });
    });
  },
  // 获取输入的退款现金
  setMoney:function(){
    this.setData({
      money: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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