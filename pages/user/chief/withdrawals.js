// pages/user/chief/withdrawals.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'在店帮购买的商品，支持“7天退换货”服务。个别商品（例如，短效期的海外食品、贴身使用的内衣物等）可能不享有退货政策，请留意商品页面上的特殊说明；',
    money:0,
    withdrawable:0,
    bankId:0,
    userBank:{}
  },
  selectBank:function (){
    wx.navigateTo({
      url: '/pages/user/chief/myBank'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.id != undefined) {
      that.setData({
        bankId: options.id
      })
    }
    that.credoCenter();
    that.getBank();
  }, 
  getmoney: function (e) {
    this.setData({
      money: e.detail.value
    })
  },
  //获取团长信息
  credoCenter: function () {
    var that = this;
    app.request(
      app.globalData.grouponUrl + '/api/credo/center', "", {
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
          credo: res.data.credo,
          withdrawable: res.data.credo.amount,
          waitIncome: res.data.waitIncome,
          monthIncome: res.data.monthIncome,
        })
      }
    )
  },
  //获取团长默认银行卡
  getBank: function () {
    var that = this;
    app.request(
      app.globalData.grouponUrl + '/api/withdraw/get', "", {
        bankId: that.data.bankId
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
      }
    )
  },
  //提现
  submit: function () {
    var that = this;
    app.request(
      app.globalData.grouponUrl + '/api/withdraw/add', "", {
        bankId: that.data.userBank.id,
        money: that.data.money,
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
          credo: res.data.credo,
          money: 0
        })
        wx.showToast({
          title: '提现成功',
          icon: 'none'
        });
        that.credoCenter();
      }
    )
  },
  cash:function(){
    this.setData({
      money: this.data.withdrawable
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
  onShow: function (options) {
      var that = this;
      that.getBank();
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