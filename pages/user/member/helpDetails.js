// pages/user/member/helpDetails.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:[],
    typeId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var typeId = options.typeId
    var id = options.id
    that.setData({
      typeId: typeId,
      articleId: id
    })
    this.getData();
  },
  /**
     * 加载数据
     */
  getData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/user/detail-article', "", {
        // typeId: that.data.typeId,
        articleId: that.data.articleId
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
          article: res.data.article
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