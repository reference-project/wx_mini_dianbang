// pages/user/chief/addBank.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankNames: ['中国建设银行', '中国银行', '中国工商银行','中国农业银行','中国招商银行'],
    region:[],
    bankUser:'',
    bankNumber:'',
    bankAddress:'',
    bankName:'',

  },
/**
 * 获取持卡人姓名
 */
  setName: function (e) {
    this.setData({
      bankUser: e.detail.value
    })
  },
  /**
 * 获取卡号
 */
  setCard: function(e){
    this.setData({
      bankNumber: e.detail.value
    })
  },
  /**
 * 获取所在支行
 */
  setAddress: function(e){
    this.setData({
      bankAddress: e.detail.value
    })
  },
  /**
   * 选择地区
   */
  bindRegionChange: function (e) {
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },
   /**
   * 选择银行
   */
  bindBankChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value;
    var bankName = '';
    if (index == 0) {
      bankName= '中国建设银行'
    } else if (index == 1) {
      bankName = '中国银行'
    } else if (index == 2) {
      bankName = '中国工商银行'
    } else if (index == 3) {
      bankName = '中国农业银行'
    } else if (index == 4) {
      bankName = '中国招商银行'
    }
    this.setData({
      bankName: bankName,
    })
    console.log(this.data.bankName)
  },
  add:function(e){
    var that = this;
    if (that.data.bankName == "") {
      wx.showToast({
        title: '请选择银行',
        icon: 'none'
      });
      return;
    }
    if (that.data.bankUser == "") {
      wx.showToast({
        title: '请填写您的姓名',
        icon: 'none'
      });
      return;
    }
    if (that.data.region == "") {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      });
      return;
    }
    if (that.data.bankNumber == "") {
      wx.showToast({
        title: '请填写银行卡号', 
        icon: 'none'
      });
      return;
    }
    if (that.data.bankAddress == "") {
      wx.showToast({
        title: '请填写所在支行',
        icon: 'none'
      });
      return;
    }
    app.request(
      app.globalData.grouponUrl + '/api/withdraw/add-bank', "", {
        "bankName": that.data.bankName,
        // "addressId": that.data.id,
        "bankNumber": that.data.bankNumber,
        "userId": that.data.userId,
        "province": that.data.region[0],
        "city": that.data.region[1],
        "area": that.data.region[2],
        "bankUser": that.data.bankUser,
        "bankAddress": that.data.bankAddress
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

        wx.showToast({
          title: "新增银行卡成功！",
          icon: 'none',
        });

        wx.navigateTo({
          url: "/pages/user/chief/myBank"
        })

      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      userId: app.globalData.user.id,
    });
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