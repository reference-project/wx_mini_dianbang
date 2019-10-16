// pages/user/member/serviceOrder.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: {
      pageNo: 1,
      pageSize: 10,
      hasNextPage: false,
      loading: false,
    },
    list: [],
  },
  goDetail:function(){
    wx.navigateTo({
      url: '/pages/user/member/detailsAftermarket'
    })
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/order/list-refund', "", {
        pageNo: that.data.page.pageNo,
        pageSize: that.data.page.pageSize,
      },
      function (res) {
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          });
          return;
        }
        //赋值分页参数
        that.setData({
          'page.hasNextPage': data.hasNextPage,
          'page.loading': false
        });

        var listIndex = that.data.list.length;
        res.data.list.forEach(function (value, index, list) {
          var key = "list[" + listIndex + "]";
          that.setData({
            [key]: value,
          });
          listIndex++;
        });
      }
    )
  },
  /**
    *  加载下一页
    */
  loadMore: function () {
    let that = this;
    if (!that.data.page.hasNextPage || that.data.page.loading) {
      return false;
    }
    this.data.page.loading = true;
    let pageNo = this.data.page.pageNo + 1;
    that.setData({
      'page.pageNo': pageNo
    })
    that.getData();
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