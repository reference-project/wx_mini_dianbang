// pages/user/myChief.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popup: true,
    list:[],
    totalNumber:0,
    directNumber: 0,
    userId:0,
  },
  /* 隐藏弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  /* 显示弹窗 */
  showPopup() {
    this.hidePopup(false);
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
    this.setData({
      userId: app.globalData.user.id
    })
    this.getData();
  },
  getData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/credo/my-credo', "", {
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
          list: res.data.list,
          directNumber: res.data.directNumber,
          totalNumber: res.data.totalNumber,
        })
        // var listIndex = that.data.list.length;
        // res.data.list.forEach(function (value, index, list) {
        //   var key = "list[" + listIndex + "]";
        //   that.setData({
        //     [key]: value,
        //   });
        //   listIndex++;
        // });
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
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '邀请团长',
      path: '/pages/user/member/application?id=' + this.data.userId,
      success: function (res) {
        // 转发成功

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})