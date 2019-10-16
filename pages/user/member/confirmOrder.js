const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serialNumber: '',
    list:[],
    totalPrice:0,
    freight:0,
    lastCredoId:0,
    credo:{},
    faceGold: 0,
    faceGoldCredit: 0,
    faceGoldFinance:0,
    showTotalPrice:0,
    defAddress:'',
    orderId:0,
    isWeixinPay:0,
    addressId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.serialNumber != undefined){
      that.setData({
        serialNumber: options.serialNumber,
      }) 
    }
    if (options.addressId != undefined) {
      that.setData({
        addressId: options.addressId,
      })
    }
    that.setData({
      lastCredoId: app.globalData.user.lastCredoId,
      openId: app.globalData.openId,
    }) 
    that.getDetail();
    console.log(that.data.defAddress);
  },
  goAddress: function () {
    wx.navigateTo({
      url: "../member/address?serialNumber=" + this.data.serialNumber
    })
  },
  //获取规格信息
  getDetail: function () {
    var that = this
    app.request(
      app.globalData.grouponUrl + '/api/order/query', "", {
        serialNumber: that.data.serialNumber,
        credoId: that.data.lastCredoId,
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
        var msgIndex = that.data.list.length;
        res.data.list.forEach(function (value, index, list) {
          var key = "list[" + msgIndex + "]";
          that.setData({
            [key]: value,
          });
          msgIndex++;
        });
        that.setData({
          totalPrice : res.data.totalPrice,
          freight: res.data.freight,
          credo: res.data.credo,
          defAddress: res.data.defAddress,
        })
        that.getMall();
        if (that.data.addressId != 0) {
          that.getaddress();
        }
      }
    )
  },
  //获取规格信息
  getMall: function () {
    var that = this
    app.request(
      app.globalData.grouponUrl + '/api/order/mall-deduct', "", {
        serialNumber: that.data.serialNumber,
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
          faceGold: res.data.deduct,
          faceGoldCredit: res.data.faceGoldCredit,
          faceGoldFinance: res.data.faceGoldFinance,
        })
        that.compuleteShowTotalPrice();
      }
    )
  },
  //计算需付款
  compuleteShowTotalPrice: function () {
    var showTotalPrice = parseInt(this.data.totalPrice) - parseInt(this.data.faceGoldCredit)
      - parseInt(this.data.faceGoldFinance) - parseInt(this.data.faceGold) + parseInt(this.data.freight);
      if (showTotalPrice > 0){
        this.setData({
          isWeixinPay: 1
        })
      }else{
        this.setData({
          isWeixinPay: 0
        })
      }
      this.setData({
        showTotalPrice: showTotalPrice
      })
  },
  //提交订单
  addOrder: function () {
    var that = this
    app.request(
      app.globalData.grouponUrl + '/api/order/submit-order', "", {
        addressId: that.data.defAddress.id,
        remark: '',
        serialNumber: that.data.serialNumber,
        faceGold: that.data.faceGold,
        faceGoldCredit: that.data.faceGoldCredit,
        faceGoldFinance: that.data.faceGoldFinance
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
          orderId: res.data.orderId
        })
        if (that.data.isWeixinPay == 1){
          that.WxPay();
        }else{
          that.pay();
        }
      } 
    )
  },
  //提交订单
  pay: function () {
    var that = this
    app.request(
      app.globalData.grouponUrl + '/api/order/pay', "", {
        orderInfoId: that.data.orderId,
        isWeixinPay: that.data.isWeixinPay,
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
        wx.redirectTo({
          url: "/pages/index/index"
        })
      }
    )
  },
  WxPay: function () {
    var that = this
    app.request(
      app.globalData.grouponUrl + '/api/weixin/pay', "", {
        orderId: that.data.orderId,
        openId: that.data.openId
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
        console.log("为了加快临时"+data.timestamp)
        wx.requestPayment({
          timeStamp: data.timestamp,
          nonceStr: data.nonceStr,
          package: data.packageStr,
          signType: 'MD5',
          paySign: data.paySign,
          success(res) {
            wx.showToast({
              title: '支付成功',
              icon: 'none'
            });
            wx.redirectTo({
              url: "/pages/index/index"
            })
          },
          fail(res) {
          }
        })
      }
    )
  },

  getaddress: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/user/get-address', "", {
        addressId: that.data.addressId,
      },
      function (res) {
        console.log(res.data);
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          });
          return;
        }

        that.setData({
          defAddress: res.data.address
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
    var that = this;
    // that.getDetail();
   
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