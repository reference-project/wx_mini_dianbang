const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentOne: 0,
    currentTwo: 0,
    currentThree: 0,
    currentFour: 0,
    current: 0,
    state:1,
    popup: true,
    isCollect:false,
    product:{},
    list:[],
    format:true,
    amount: 1,
    skuNameOne:'',
    skuNameTwo: '',
    skuNameThree: '',
    skuNameFour: '',
    chooseThree: [],
    specTwo: [],
    specThree: [],
    specFour: [],
    hasSpec: '',
    specOneItemId: 0,
    specTwoItemId: 0,
    specThreeItemId: 0,
    specFourItemId: 0,
    specOneItemName: '',
    specTwoItemName: '',
    specThreeItemName: '',
    specFourItemName: '',
    proSpecItemIndex:{},
    activityId:'',
    credoId:'',
    serialNumber: '',
    // productId:'',
    level:1,//判断是否可以进行购买商品的参数
    // levels:1,

  },
  swiperChange: function (e) {
    if (e.detail.source == 'touch') {
      this.setData({
        current: e.detail.current
      })
    }
  },
  
  navClick: function (e) {
    this.setData({
      state: e.target.dataset.state
    })
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
  closeShow(flag = true){
    this.setData({
      "format": flag
    });
  },
  goShow(){
    this.closeShow(false);
  },
  // 前往首页
  goIndex:function(){
    wx.navigateTo({
      url: '../index/index'
    })
  },
  // 前往购物车
  goCar: function () {
    wx.navigateTo({
      url: '../mall/car'
    })
  },
  //立即购买
  // purchase: function () {
  //   wx.navigateTo({
  //     url: '../user/member/orderDetail'
  //   })
  // },
  /**
 * 收藏
 */

  // 规格数量的添加
  addClick: function () {
    if (this.data.iSspecial == 1) {
      return false;
    }
    this.setData({
      amount: this.data.amount + 1,
    })
  },
// 减少
  minusClick: function () {
    if (this.data.amount > 1) {
      this.setData({
        amount: this.data.amount - 1,
      })
    }
  },
  // 切换商品类型
  chooseOne: function (options) {
    var _this = this
    var id = options.currentTarget.dataset.id;
    var name = options.currentTarget.dataset.name;
    console.log(id);
    console.log(options.currentTarget.dataset.item);
    //设置当前样式
    _this.setData({
      'currentOne': id,
      skuNameOne: name,
      specOneItemId: options.currentTarget.dataset.item.id,
      specOneItemName: options.currentTarget.dataset.item.name,
    })
    _this.getspec();
  },
  chooseTwo: function (options) {
    var _this = this
    var id = options.currentTarget.dataset.id;
    var name = options.currentTarget.dataset.name;
    console.log(id);
    console.log(options.currentTarget.dataset.item);
    //设置当前样式
    _this.setData({
      'currentTwo': id,
      skuNameTwo: "," +name,
      specTwoItemId: options.currentTarget.dataset.item.id,
      specTwoItemName: options.currentTarget.dataset.item.name,
    })
    _this.getspec();
  },
  chooseThree: function (options) {
    var _this = this
    var id = options.currentTarget.dataset.item.id;
    var name = options.currentTarget.dataset.item.name;
    console.log(id);
    //设置当前样式
    _this.setData({
      'currentThree': id,
      skuNameThree: "," + name,
      specThreeItemId : options.currentTarget.dataset.item.id,
      specThreeItemName: options.currentTarget.dataset.item.name,
    })
    _this.getspec();
  },
  chooseFour: function (options) {
    var _this = this
    var id = options.currentTarget.dataset.id;
    var name = options.currentTarget.dataset.name;
    console.log(id);
    //设置当前样式
    _this.setData({
      'currentFour': id,
      skuNameFour: "," + name,
      specFourItemId: options.currentTarget.dataset.item.id,
      specFourItemName: options.currentTarget.dataset.item.name,
    })
    _this.getspec();
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      this.setData({
        id:options.id,
        activityId: options.activityId,
        credoId: app.globalData.user.lastCredoId,
        // productId: options.productId,
        // level: options.state,
        level: options.level,
      })
    that.getData();
  },
  //获取商品详情
  getData: function () {
    var that = this
    app.request(
      app.globalData.grouponUrl + '/api/product/get', "", {
        productId: that.data.id,
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
        var limitTime = that.countdown(res.data.product.limitTime);
        var item = res.data.product;
        var content = ''
        if (item != null) {
          content = item.content;
        }
        console.log(item.content)
        content = content.replace(new RegExp(/\\/g), '/');
        console.log(content)
        that.data.wxParseData = content;
        WxParse.wxParse('wxParseData', 'html', that.data.wxParseData, that, 0);

        var buyRemark = ''
        if (item != null) {
          buyRemark = item.buyRemark;
        }
        console.log(item.buyRemark)
        buyRemark = buyRemark.replace(new RegExp(/\\/g), '/');
        console.log(content)
        that.data.buyRemark = buyRemark;
        WxParse.wxParse('buyRemark', 'html', that.data.buyRemark, that, 0);
          that.setData({
            product: res.data.product,
            list: res.data.product.picFullPathList,
            specOne: res.data.specOne,
            specTwo: res.data.specTwo,
            specThree: res.data.specThree,
            specFour: res.data.specFour,
            hasSpec: res.data. hasSpec
          })
         var bol = true; 
          if (res.data.collect != null){
            that.setData({
               isCollect: bol
            })
          }
      }
    )
  },
  countdown: function (limitTime) {
    var _this = this;
    setInterval(function () {
      let s = limitTime / 1e3
      let e = parseInt(s / 3600), //总小时数 1
        e2 = parseInt(s % 3600), // 100S
        t = parseInt(e2 / 60), //总分钟数 1
        t2 = parseInt(e2 % 60)//40S
      if (limitTime <= 0) {
        e = 0
        t = 0
        t2 = 0
      } else {
        limitTime -= 1e3
      }
      if (t2 < 10) {
        t2 = '0' + t2;
      }
      let c = (e < 10 ? '0' : '') + e + ":" + (t < 10 ? '0' : '') + t + ":" + t2;
      _this.setData({
        limitTime: c
      })
    }, 1e3);
  },

  //获取规格信息
  getspec: function () {
    var that = this
    app.request(
      app.globalData.grouponUrl + '/api/product/product-spec', "", {
        specOneId: that.data.specOneItemId,
        specTwoId: that.data.specTwoItemId,
        specThreeId: that.data.specThreeItemId,
        specFourId: that.data.specFourItemId,
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
          proSpecItemIndex : res.data.proSpecItemIndex,
          incomeType: res.data.incomeType,
          upLevelVip: res.data.upLevelVip,
          selfIncome: res.data.selfIncome,
          feactureIncome: res.data.feactureIncome,
          proSpecItemIndexId: res.data.proSpecItemIndex.id,
          showPriceSale: res.data.proSpecItemIndex.priceSale,
          vipPrice: res.data.proSpecItemIndex.vipPrice,//vip会员价
          price: res.data.proSpecItemIndex.markingPrice,
          skuCode: res.data.proSpecItemIndex.skuCode,
          specPicStr: res.data.proSpecItemIndex.specPicStr,
          taxation: res.data.taxation,
        })
      }
    )
  },
  //加入购物车
  addCart:function(){
    var that = this;
    if (that.data.specOneItemId == 0 && that.data.specTwoItemId == 0 && that.data.specThreeItemId == 0 && that.data.specFourItemId == 0) {
      wx.showToast({
        title: "请选择规格",
        icon: 'none',
      });
      return;
    }
    app.request(
      app.globalData.grouponUrl + '/api/cart/add-cart', "", {
        id: that.data.proSpecItemIndexId,
        productId: that.data.product.id,
        quantity: that.data.amount,
        cartType: 0,
        activityId: that.data.activityId,
        credoId: that.data.credoId,
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
          title: "加入购物车成功",
          icon: 'none',
        });
        that.setData({
          "format": "flag"
        });
      }
    )
  },
  //立即购买
  purchase: function () {
    var that = this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000; 
    that.setData({
      serialNumber: timestamp
    }) 
    if (that.data.specOneItemId == 0 && that.data.specTwoItemId == 0 && that.data.specThreeItemId == 0 && that.data.specFourItemId == 0) {
      wx.showToast({
        title: "请选择规格",
        icon: 'none',
      });
      return;
    }
    app.request(
      app.globalData.grouponUrl + '/api/order/buynow', "", {
        specItemIndexId: that.data.proSpecItemIndexId,
        quantity: that.data.amount,
        activityId: that.data.activityId,
        serialNumber: timestamp,
        credoId: that.data.credoId,
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
        wx.navigateTo({
          url: '../user/member/confirmOrder?serialNumber=' + that.data.serialNumber
        })
        that.setData({
          "format": "flag"
        });
      }
    )
  },
  //收藏
  goCollect:function(){
    var that = this;
    var bol = that.data.isCollect; // 获取状态
    that.setData({
      isCollect: !bol // 改变状态
    })
    app.request(
      app.globalData.grouponUrl + '/api/collect/add', "", {
        id: that.data.product.id,
        type: 1,
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
          title: "收藏成功",
          icon: 'none',
        });
       
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